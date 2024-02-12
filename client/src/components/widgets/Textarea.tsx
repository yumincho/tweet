import React from "react";

import "./Textarea.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const maxLength = 140;

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  addOne: () => Promise<void>;
}

const Textarea = ({ content, setContent, addOne }: Props) => {
  const [isValidLength, setIsValidLength] = React.useState(false);

  const checkTweet = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 140 || e.target.value.length < 1) {
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
          placeholder="140자 이하로 입력해 주세요."
          className={`tweetTextarea`}
          value={content}
          onChange={(e) => {
            checkTweet(e);
            setContent(e.target.value);
          }}
        />
        <div
          style={{
            width: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "36px", height: "36px" }}>
            <CircularProgressbar
              value={content.length}
              maxValue={maxLength}
              strokeWidth={12}
              text={
                maxLength >= content.length && content.length >= maxLength - 10
                  ? `${maxLength - content.length}`
                  : content.length >= maxLength
                  ? `-${content.length - maxLength}`
                  : ``
              }
              styles={{
                path: {
                  stroke:
                    content.length <= maxLength
                      ? "var(--color-main-orange)"
                      : "var(--color-red)",
                },
                trail: {
                  stroke: "var(--color-gray-100)",
                },
                text: {
                  fill:
                    content.length <= maxLength
                      ? "var(--color-black)"
                      : "var(--color-red)",
                  fontSize: "30px",
                },
              }}
            />
          </div>
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
