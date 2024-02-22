import React from "react";
import "./Textarea.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const maxLength = 140;

interface Props {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  addOne: () => Promise<void>;
  canSubmit: React.MutableRefObject<boolean>;
}

const checkValidLength = (content: string) => {
  const processedContent = content.replace(/[\n\r\t]|\s+/g, "");
  return processedContent.length > 0 && processedContent.length <= 140;
};

const Textarea = ({ content, setContent, addOne, canSubmit }: Props) => {
  const formRef = React.useRef<HTMLFormElement>(null);

  const onFormSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (checkValidLength(content)) addOne();
  };

  return (
    <>
      <form className="tweetContainer" onSubmit={onFormSubmit} ref={formRef}>
        <textarea
          minLength={1}
          placeholder="140자 이하로 입력해 주세요."
          className={`tweetTextarea`}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !e.shiftKey &&
              canSubmit.current &&
              checkValidLength(e.currentTarget.value)
            ) {
              canSubmit.current = false;
              e.preventDefault();
              formRef.current?.dispatchEvent(
                new Event("submit", { bubbles: true, cancelable: true })
              );
            }
          }}
          onKeyUp={() => {
            if (content.length === 0) canSubmit.current = true;
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
                      : "var(--color-red-700)",
                },
                trail: {
                  stroke: "var(--color-gray-100)",
                },
                text: {
                  fill:
                    content.length <= maxLength
                      ? "var(--color-black)"
                      : "var(--color-red-700)",
                  fontSize: "30px",
                },
              }}
            />
          </div>
          <button
            type="submit"
            disabled={!checkValidLength(content)}
            className="tweetButton"
          >
            ↩︎
          </button>
        </div>
      </form>
    </>
  );
};

export default Textarea;
