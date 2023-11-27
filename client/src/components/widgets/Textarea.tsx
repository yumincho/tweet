import React from "react";
import axios from "axios";
import { SAPIBase } from "../../tools/api";

import "./Textarea.css";

interface Props {
  nickname: string;
  tweetCount: number;
  setTweetCount: React.Dispatch<React.SetStateAction<number>>;
}

const Textarea = ({ nickname, tweetCount, setTweetCount }: Props) => {
  const [content, setContent] = React.useState("");

  const addTweet = async () => {
    await axios.post(SAPIBase + "/tweet", {
      Id: tweetCount,
      AuthorNickname: nickname,
      Content: content,
    });
    setContent("");
    setTweetCount(tweetCount + 1);
  };
  return (
    <>
      {/* <span className="tweetAuthor">작성자 | {nickname}</span>  */}
      <div className="tweetContainer">
        <textarea
          className="tweetTextarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="tweetButton" onClick={addTweet}>
          ↩︎
        </button>
      </div>
    </>
  );
};

export default Textarea;
