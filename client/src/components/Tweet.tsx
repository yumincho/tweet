import "./Tweet.css";
interface Props {
  author: string;
  content: string;
  date: string;
}

const Tweet = ({ author, content, date }: Props) => {
  return (
    <div className="tweetBox">
      <div className="tweetData">
        <p className={"tweetAuthor"}>{author}</p>
        <p className={"tweetDate"}>{date}</p>
      </div>
      <p className={"tweetContent"}>{content}</p>
    </div>
  );
};

export default Tweet;
