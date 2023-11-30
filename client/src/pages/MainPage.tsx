import React from "react";
// import { useContext } from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";

// import Textarea from "../components/widgets/Textarea";
import UserInfo from "../components/UserInfo";
import Calendar from "../components/widgets/Calendar";
import UserInfoContext from "../components/contexts/userInfoContext";

interface ChildrenProps {
  children: JSX.Element;
}

const MainPage: React.FC<ChildrenProps> = ({ children }) => {
  const [loginUserNickname, setLoginUserNickname] = React.useState("");

  const getUserNickname = () => {
    const userNickname = async () => {
      const userNickname = await axios.get(SAPIBase + "/auth/nickname");
      setLoginUserNickname(userNickname.data);
    };
    userNickname();
  };

  React.useEffect(getUserNickname, [loginUserNickname]);

  return (
    <UserInfoContext.Provider value={{ nickname: loginUserNickname }}>
      <div className="container">
        <div className="leftContainer test">
          <UserInfo nickname={loginUserNickname} />
          <Calendar />
        </div>

        <div className="rightContainer test">{children}</div>
      </div>
    </UserInfoContext.Provider>
  );
};

export default MainPage;
