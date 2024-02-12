import React from "react";
import { useLoaderData } from "react-router-dom";

import UserInfo from "../components/sections/UserInfo";
import Calendar from "../components/widgets/Calendar";
import UserInfoContext from "../components/contexts/userInfoContext";

interface ChildrenProps {
  children: JSX.Element;
}

export interface userInfoProps {
  nickname: string;
  tweetNum: number;
  commentNum: number;
  likeNum: number;
}

const MainPage: React.FC<ChildrenProps> = ({ children }) => {
  const [userNickname, setUserNickname] = React.useState("");
  const [userTweetNum, setUserTweetNum] = React.useState(0);
  const [userCommentNum, setUserCommentNum] = React.useState(0);
  const [userLikeNum, setUserLikeNum] = React.useState(0);

  const userInfo = useLoaderData() as userInfoProps;

  const getUserInfo = () => {
    const { nickname, tweetNum, commentNum, likeNum } = userInfo;

    setUserNickname(nickname);
    setUserTweetNum(tweetNum);
    setUserCommentNum(commentNum);
    setUserLikeNum(likeNum);
  };

  React.useEffect(getUserInfo, [userInfo, userNickname]);

  return (
    <UserInfoContext.Provider value={{ nickname: userNickname }}>
      <div className="container">
        <div className="leftContainer test">
          <UserInfo
            nickname={userNickname}
            tweetNum={userTweetNum}
            commentNum={userCommentNum}
            likeNum={userLikeNum}
          />
          <Calendar />
        </div>

        <div className="rightContainer test">{children}</div>
      </div>
    </UserInfoContext.Provider>
  );
};

export default MainPage;
