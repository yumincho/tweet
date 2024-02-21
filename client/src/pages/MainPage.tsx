import React from "react";
import { useLoaderData } from "react-router-dom";

import UserInfo from "../components/sections/UserInfo";
import Calendar from "../components/widgets/Calendar";
import { userInfoProps } from "../types/user";

interface ChildrenProps {
  children: JSX.Element;
}

const MainPage: React.FC<ChildrenProps> = ({ children }) => {
  const userInfo = useLoaderData() as userInfoProps;

  return (
    <div className="container">
      <div className="leftContainer test">
        <UserInfo userInfo={userInfo} />
        <Calendar />
      </div>
      <div className="rightContainer test">{children}</div>
    </div>
  );
};

export default MainPage;
