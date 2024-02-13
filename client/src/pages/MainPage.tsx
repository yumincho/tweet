import React from "react";
import { useLoaderData } from "react-router-dom";

import UserInfo from "../components/sections/UserInfo";
import Calendar from "../components/widgets/Calendar";
import { userInfoProps } from "../types/user";

import { useUserInfoStore } from "../storage/user";

interface ChildrenProps {
  children: JSX.Element;
}

const MainPage: React.FC<ChildrenProps> = ({ children }) => {
  const userInfo = useLoaderData() as userInfoProps;

  const {
    nickname,
    tweetNum,
    commentNum,
    likeNum,
    setNickname,
    setTweet,
    setComment,
    setLike,
  } = useUserInfoStore();

  const getUserInfo = () => {
    const { nickname, tweetNum, commentNum, likeNum } = userInfo;

    setNickname(nickname);
    setTweet(tweetNum);
    setComment(commentNum);
    setLike(likeNum);
  };

  React.useEffect(getUserInfo, [
    setNickname,
    setTweet,
    setComment,
    setLike,
    userInfo,
  ]);

  return (
    <div className="container">
      <div className="leftContainer test">
        <UserInfo
          nickname={nickname}
          tweetNum={tweetNum}
          commentNum={commentNum}
          likeNum={likeNum}
        />
        <Calendar />
      </div>
      <div className="rightContainer test">{children}</div>
    </div>
  );
};

export default MainPage;
