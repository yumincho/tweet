import "./OwnerTweet.css";
import { IoChatbubbleOutline, IoFlash, IoFlashOutline } from "react-icons/io5";

interface TweetFeedData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
}
interface OwnerTweetProps {
  id: number;
  author: string;
  content: string;
  date: string;
  tweetFeedData: TweetFeedData[];
  clickLike: () => Promise<void>;
  clickDislike: () => Promise<void>;
  like: boolean;
  countComments: number;
}

const OwnerTweet = ({
  author,
  content,
  date,
  tweetFeedData,
  clickLike,
  clickDislike,
  like,
  countComments,
}: OwnerTweetProps) => {
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
        <span className="iconAndFigure">
          <IoChatbubbleOutline size="20" />
          {tweetFeedData.length}
        </span>
        <span
          className="iconAndFigure"
          onClick={like ? clickDislike : clickLike}
        >
          {like ? (
            <IoFlash size="20" color="var(--color-main-orange)" />
          ) : (
            <IoFlashOutline size="20" />
          )}
          {countComments}
        </span>
      </div>
    </>
  );
};

export default OwnerTweet;
