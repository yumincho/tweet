import "./Feed.css";

import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";

import Tweet from "./Tweet";
interface TweetData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
}
interface TweetCount {
  tweetCount: number;
}
const Feed: React.FC<TweetCount> = ({ tweetCount }) => {
  const [feedData, setFeedData] = React.useState<TweetData[]>([]);
  // const [tweetCount, setTweetCount] = React.useState<number>(1);

  const getFeed = () => {
    const getFeedFunc = async () => {
      const { data } = await axios.get(SAPIBase + "/tweet");
      setFeedData(data);
    };
    getFeedFunc();
  };

  React.useEffect(getFeed, [tweetCount]);

  return (
    <div className="feedContainer">
      {feedData.map(({ Id, AuthorNickname, Content, Date }) => (
        <div key={Id}>
          <Tweet author={AuthorNickname} content={Content} date={Date} />
        </div>
      ))}
    </div>
  );
};

export default Feed;
