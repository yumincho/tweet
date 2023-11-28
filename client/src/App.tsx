import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import FirstPage from "./pages/FirstPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

import Feed from "./components/sections/Feed";
import TweetFeed from "./components/sections/TweetFeed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/main"
            element={
              <MainPage>
                <Feed />
              </MainPage>
            }
          />
          <Route
            path="/"
            element={
              <MainPage>
                <TweetFeed />
              </MainPage>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
