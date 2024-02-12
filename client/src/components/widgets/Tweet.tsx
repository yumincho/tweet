import "./Tweet.css";

import React from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import { IoChatbubbleOutline, IoFlash, IoFlashOutline } from "react-icons/io5";

import { useUserInfoStore } from "../../storage/user";

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

  /* get userInfo from the global store */
  const { nickname, increaseLike, decreaseLike } = useUserInfoStore();

  /* like and dislike action */
  const [like, setLike] = React.useState(userLike);
  const [likesCount, setLikesCount] = React.useState(likes); // not fetch data from db in real, but show as it does
  const clickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    /* prevent navigate to ownerTweet */
    e.stopPropagation();

    /* update userLike info */
    await axios.post(SAPIBase + "/tweet/like", {
      UserNickname: nickname,
      TweetId: id,
    });
    setLikesCount((curr) => curr + 1);
    setLike(true);
    increaseLike();
  };

  const clickDislike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await axios.delete(SAPIBase + "/tweet/like", {
      data: {
        UserNickname: nickname,
        TweetId: id,
      },
    });
    setLikesCount((curr) => curr - 1);
    setLike(false);
    decreaseLike();
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
          <div className="iconAndFigure">
            <IoChatbubbleOutline className="noHoverIcon" size="20" />
            {comments}
          </div>
          <div>
            <button
              className="iconAndFigure hoverAction"
              onClick={like ? clickDislike : clickLike}
            >
              {like ? (
                <IoFlash
                  className="icon"
                  size="20"
                  color="var(--color-main-orange)"
                />
              ) : (
                <IoFlashOutline className="icon" size="20" />
              )}
              <span className="text">{likesCount}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tweet;
