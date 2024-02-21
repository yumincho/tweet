import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../../tools/api";

import { useUserInfoStore } from "../../storage/user";
import { userInfoProps } from "../../types/user";

import "./UserInfo.css";

import {
  IoCreateOutline,
  IoChatbubbleOutline,
  IoFlashOutline,
} from "react-icons/io5";

interface Props {
  userInfo: userInfoProps;
}

const UserInfo: React.FC<Props> = ({ userInfo }) => {
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

  const navigate = useNavigate();

  const userLogout = () => {
    const asyncFun = async () => {
      await axios.post(
        SAPIBase + "/auth/logout",
        {
          nickname,
        },
        { withCredentials: true }
      );

      navigate("/");
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const userLogin = () => {
    navigate("/");
  };

  return nickname !== "" ? (
    <div className="containerItem userInfo test">
      <strong>{nickname} 님 🙌 </strong>
      <div className="userInfoNum">
        <span className="iconAndFigure">
          <IoCreateOutline className="noHoverIcon" size="20" /> {tweetNum}
        </span>
        <span className="iconAndFigure">
          <IoChatbubbleOutline className="noHoverIcon" size="20" /> {commentNum}
        </span>
        <span className="iconAndFigure">
          <IoFlashOutline className="icon" size="20" /> {likeNum}
        </span>
      </div>

      <button className="secondaryButton" onClick={userLogout}>
        Logout
      </button>
    </div>
  ) : (
    <div className="containerItem userInfo test">
      <strong> 로그인이 필요합니다. </strong>
      <button className="secondaryButton" onClick={userLogin}>
        Login
      </button>
    </div>
  );
};

export default UserInfo;
