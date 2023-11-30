import "./Feed.css";

import React from "react";
import { useContext } from "react";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import Tweet from "../widgets/Tweet";
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
  const [count, setCount] = React.useState(0);

  /* manage content from textarea */
  const [content, setContent] = React.useState("");

  /* get user nickname from the context */
  const { nickname } = useContext(UserInfoContext);

  /* api call when the user add new tweet */
  const addTweet = async () => {
    await axios.post(SAPIBase + "/tweet", {
      AuthorNickname: nickname,
      Content: content,
    });
    setContent("");
    setCount(count + 1);
  };

  /* reload feed when the user add new tweet */
  const getFeed = () => {
    const getFeedFunc = async () => {
      const { data } = await axios.get(SAPIBase + "/tweet");
      setFeedData(data);
    };
    getFeedFunc();
  };

  /* track if the user add new tweet */
  React.useEffect(getFeed, [count]);

  return (
    <>
      <div className="feedContainer">
        {feedData.map(({ Id, AuthorNickname, Content, Date }) => (
          <div key={Id}>
            <Tweet
              id={Id}
              author={AuthorNickname}
              content={Content}
              date={Date}
            />
          </div>
        ))}
      </div>
      <Textarea content={content} setContent={setContent} addOne={addTweet} />
    </>
  );
};

export default Feed;
