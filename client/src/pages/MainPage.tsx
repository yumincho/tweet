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
  const [loginUserNickanme, setLoginUserNickname] = React.useState("");

  const userNickname = async () => {
    const userNickname = await axios.get(SAPIBase + "/auth/nickname");
    setLoginUserNickname(userNickname.data);
  };

  userNickname();

  return (
    <UserInfoContext.Provider value={{ nickname: loginUserNickanme }}>
      <div className="container test">
        <div className="leftContainer test">
          <UserInfo />
          <Calendar />
        </div>

        <div className="rightContainer">{children}</div>
      </div>
    </UserInfoContext.Provider>
  );
};

export default MainPage;
