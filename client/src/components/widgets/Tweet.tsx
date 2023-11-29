import "./Tweet.css";

import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  author: string;
  content: string;
  date: string;
}

const Tweet = ({ id, author, content, date }: Props) => {
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
