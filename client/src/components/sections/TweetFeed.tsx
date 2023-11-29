import "./TweetFeed.css";

import React from "react";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import Comment from "../widgets/Comment";
import Textarea from "../widgets/Textarea";
import UserInfoContext from "../contexts/userInfoContext";
import OwnerTweet from "../widgets/OwnerTweet";

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
  const { tweetId, tweetAuthor, tweetContent, tweetDate } = state;

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

  /* navigation */
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate("/main");
  };

  return (
    <div className="feedContainer">
      <button onClick={onBackClick}>Back to main</button>
      {/* main tweet */}
      <OwnerTweet
        id={tweetId}
        author={tweetAuthor}
        content={tweetContent}
        date={tweetDate}
        tweetFeedData={tweetFeedData}
      />
      {/* comments */}
      {tweetFeedData.map(({ Id, AuthorNickname, Content, Date }) => (
        <div key={Id}>
          <Comment
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
