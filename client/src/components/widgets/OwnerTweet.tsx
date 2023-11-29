import "./OwnerTweet.css";
import { IoChatbubbleOutline } from "react-icons/io5";

interface TweetFeedData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
}
interface Props {
  id: number;
  author: string;
  content: string;
  date: string;
  tweetFeedData: TweetFeedData[];
}

const OwnerTweet = ({ author, content, date, tweetFeedData }: Props) => {
  return (
    <>
      <div className="ownerTweetBox">
        <div className="ownerTweetData">
          <p className={"ownerTweetAuthor"}>{author}</p>
          <p className={"ownerTweetDate"}>{date}</p>
        </div>
        <p className={"ownerTweetContent"}>{content}</p>
      </div>
      <div className="ownerTweetInfo">
        <span>
          <IoChatbubbleOutline />
          {tweetFeedData.length}
        </span>
      </div>
    </>
  );
};

export default OwnerTweet;
