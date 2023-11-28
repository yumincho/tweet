import "./TweetFeed.css";

import React from "react";
import { useContext } from "react";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import Tweet from "../Tweet";
import Textarea from "../widgets/Textarea";
import UserInfoContext from "../contexts/userInfoContext";

interface TweetFeedData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
}

const TweetFeed = () => {
  const [tweetFeedData, setTweetFeedData] = React.useState<TweetFeedData[]>([]);
  const [commentCount, setCommentCount] = React.useState(0);

  const getTweetFeed = () => {
    const getFeedFunc = async () => {
      const { data } = await axios.get(SAPIBase + "/tweetFeed", {
        /* todo: pass parent tweetId */
      });
      setTweetFeedData(data);
    };
    getFeedFunc();
  };

  React.useEffect(getTweetFeed, [commentCount]);

  const { nickname } = useContext(UserInfoContext);

  return (
    <div className="feedContainer">
      {tweetFeedData.map(({ Id, AuthorNickname, Content, Date }) => (
        <div key={Id}>
          <Tweet author={AuthorNickname} content={Content} date={Date} />
        </div>
      ))}
      <Textarea
        nickname={nickname}
        tweetCount={commentCount}
        setTweetCount={setCommentCount}
      />
    </div>
  );
};

export default TweetFeed;
