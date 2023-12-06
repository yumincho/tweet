import "./Tweet.css";

import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import UserInfoContext from "../contexts/userInfoContext";
import { IoChatbubbleOutline, IoFlash, IoFlashOutline } from "react-icons/io5";

interface Props {
  id: number;
  author: string;
  content: string;
  date: string;
  comments: number;
  likes: number;
  userLike: boolean;
}

const Tweet = ({
  id,
  author,
  content,
  date,
  comments,
  likes,
  userLike,
}: Props) => {
  const navigate = useNavigate();

  const onTweetBoxClick = () => {
    navigate(`/tweet/${id}`, {
      state: {
        tweetId: id,
        tweetAuthor: author,
        tweetContent: content,
        tweetDate: date,
      },
    });
  };

  /* like and dislike action */
  /* get user nickname from the context */
  const { nickname } = useContext(UserInfoContext);

  const [like, setLike] = React.useState(userLike);

  const clickLike = async () => {
    await axios.post(SAPIBase + "/tweet/like", {
      UserNickname: nickname,
      TweetId: id,
    });
    setLike(true);
  };

  const clickDislike = async () => {
    await axios.delete(SAPIBase + "/tweet/like", {
      data: {
        UserNickname: nickname,
        TweetId: id,
      },
    });
    setLike(false);
  };

  return (
    <>
      <div className="tweetBox" onClick={onTweetBoxClick}>
        <div className="tweetData">
          <p className={"tweetAuthor"}>{author}</p>
          <p className={"tweetDate"}>{date}</p>
        </div>
        <p className={"tweetContent"}>{content}</p>
        <div className="tweetCountInfo">
          <span className="iconAndFigure">
            <IoChatbubbleOutline size="20" />
            {comments}
          </span>
          <span
            className="iconAndFigure"
            onClick={like ? clickDislike : clickLike}
          >
            {userLike ? (
              <IoFlash
                className="icon"
                size="20"
                color="var(--color-main-orange)"
              />
            ) : (
              <IoFlashOutline className="icon" size="20" />
            )}
            {likes}
          </span>
        </div>
      </div>
    </>
  );
};

export default Tweet;
