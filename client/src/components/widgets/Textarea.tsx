import React from "react";

// import { Color } from "../styles";
import "./Textarea.css";

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  addOne: () => Promise<void>;
}

const Textarea = ({ content, setContent, addOne }: Props) => {
  const [isValidLength, setIsValidLength] = React.useState(false);

  const checkTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 140 || e.target.value.length < 10) {
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
          placeholder="10자 이상, 140자 이하로 입력해 주세요."
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
            onClick={addOne}
          >
            ↩︎
          </button>
        </div>
      </div>
    </>
  );
};

export default Textarea;
