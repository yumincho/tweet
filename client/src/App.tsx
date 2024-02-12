import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// import FirstPage from "./pages/FirstPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import Feed from "./components/sections/Feed";
import TweetFeed from "./components/sections/TweetFeed";

import { redirect } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "./tools/api";

function App() {
  const queryClient = new QueryClient();

  const loginLoader = async () => {
    try {
      const res = await axios.get<boolean>(SAPIBase + "/auth/checkSession");
      if (res.data) {
        throw Error("Logged In User Detected");
      } else {
        return res.data;
      }
    } catch (error) {
      return redirect("/main");
    }
  };

  const mainLoader = async () => {
    try {
      const res = await axios.get<{
        nickname: string;
        tweetNum: number;
        commentNum: number;
        likeNum: number;
      }>(SAPIBase + "/auth/userInfo");
      if (res.status === 401) {
        throw Error("User Invalid");
      } else {
        return res.data;
      }
    } catch (error) {
      return redirect("/");
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      loader: loginLoader,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/main",
      element: (
        <MainPage>
          <Feed />
        </MainPage>
      ),
      loader: mainLoader,
    },
    {
      path: "/tweet/:id",
      element: (
        <MainPage>
          <TweetFeed />
        </MainPage>
      ),
      loader: mainLoader,
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
