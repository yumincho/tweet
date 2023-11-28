import "./Feed.css";

import React from "react";
import { useContext } from "react";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import Tweet from "../Tweet";
import Textarea from "../widgets/Textarea";
import UserInfoContext from "../contexts/userInfoContext";

interface TweetData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
}

const Feed = () => {
  const [feedData, setFeedData] = React.useState<TweetData[]>([]);
  const [tweetCount, setTweetCount] = React.useState(0);

  const getFeed = () => {
    const getFeedFunc = async () => {
      const { data } = await axios.get(SAPIBase + "/tweet");
      setFeedData(data);
    };
    getFeedFunc();
  };

  React.useEffect(getFeed, [tweetCount]);

  const { nickname } = useContext(UserInfoContext);

  return (
    <div className="feedContainer">
      {feedData.map(({ Id, AuthorNickname, Content, Date }) => (
        <div key={Id}>
          <Tweet author={AuthorNickname} content={Content} date={Date} />
        </div>
      ))}
      nickname: {nickname}
      <Textarea
        nickname={nickname}
        tweetCount={tweetCount}
        setTweetCount={setTweetCount}
      />
    </div>
  );
};

export default Feed;