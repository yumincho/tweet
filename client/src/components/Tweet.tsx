import "./Tweet.css";

import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  author: string;
  content: string;
  date: string;
  // isModalOpened: boolean;
  // setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tweet = ({
  author,
  content,
  date,
}: // isModalOpened,
// setIsModalOpened,
Props) => {
  const navigate = useNavigate();

  const onTweetBoxClick = () => {
    // setIsModalOpened((curr) => !curr);
    navigate("/");
  };

  return (
    <>
      <div className="tweetBox" onClick={onTweetBoxClick}>
        <div className="tweetData">
          <p className={"tweetAuthor"}>{author}</p>
          <p className={"tweetDate"}>{date}</p>
        </div>
        <p className={"tweetContent"}>{content}</p>
      </div>
    </>
  );
};

export default Tweet;
