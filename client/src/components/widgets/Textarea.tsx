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
  const [isValidLength, setIsValidLength] = React.useState(true);

  const addTweet = async () => {
    await axios.post(SAPIBase + "/tweet", {
      AuthorNickname: nickname,
      Content: content,
    });
    setContent("");
    setTweetCount(tweetCount + 1);
  };

  const checkTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 140) {
      setIsValidLength(false);
    } else {
      setIsValidLength(true);
    }
  };
  return (
    <>
      {/* <span className="tweetAuthor">작성자 | {nickname}</span>  */}
      <div className="tweetContainer">
        <textarea
          className={`tweetTextarea ${isValidLength ? "" : "error"}`}
          value={content}
          onChange={(e) => {
            checkTweet(e);
            setContent(e.target.value);
          }}
        />
        <div>
          <span>{content.length} / 140</span>
          <button
            disabled={!isValidLength}
            className="tweetButton"
            onClick={addTweet}
          >
            ↩︎
          </button>
        </div>
      </div>
    </>
  );
};

export default Textarea;
