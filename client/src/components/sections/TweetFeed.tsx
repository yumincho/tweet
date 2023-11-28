import "./TweetFeed.css";

import React from "react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

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

  /* get tweetId from URL */
  const { state } = useLocation();
  const { tweetId } = state;

  /* get info of the tweet */
  const getTweetFeed = () => {
    const getFeedFunc = async () => {
      const { data } = await axios.get(SAPIBase + "/comment", {
        params: {
          TweetId: tweetId,
        },
      });
      setTweetFeedData(data);
    };
    getFeedFunc();
  };

  /* track if the user add new comment */
  React.useEffect(getTweetFeed, [commentCount, tweetId]);

  /* get user nickname from the context */
  const { nickname } = useContext(UserInfoContext);

  return (
    <div className="feedContainer">
      {tweetFeedData.map(({ Id, AuthorNickname, Content, Date }) => (
        <div key={Id}>
          <Tweet
            id={Id}
            author={AuthorNickname}
            content={Content}
            date={Date}
          />
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
