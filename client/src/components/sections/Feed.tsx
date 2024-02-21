import "./Feed.css";

import React from "react";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import Tweet from "../widgets/Tweet";
import Textarea from "../widgets/Textarea";
import { useUserInfoStore } from "../../storage/user";
import { IoRefresh } from "react-icons/io5";
interface TweetData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
  Comments: number;
  Likes: number;
  UserLike: boolean;
}

const Feed = () => {
  const [feedData, setFeedData] = React.useState<TweetData[]>([]);

  /* manage content from textarea */
  const [content, setContent] = React.useState("");

  /* get nickname from global store */
  const { nickname, increaseTweet } = useUserInfoStore();

  /* api call when the user add new tweet */
  const addTweet = async () => {
    await axios.post(SAPIBase + "/tweet", {
      AuthorNickname: nickname,
      Content: content,
    });
    setContent("");
    increaseTweet();
    getFeed();
  };

  const [spin, setSpin] = React.useState(false);

  /* reload feed when the user add new tweet */
  const getFeed = () => {
    // getFeed only after the context loading ends
    if (nickname !== "") {
      setSpin(true);
      setTimeout(() => {
        setSpin(false);
      }, 1000);
      const getFeedFunc = async () => {
        const { data } = await axios.get(SAPIBase + "/tweet", {
          params: {
            userNickname: nickname,
          },
        });
        setFeedData(data.reverse());
      };
      getFeedFunc();
    }
  };

  /* track if the user add new tweet */
  React.useEffect(getFeed, [nickname]);

  return (
    <>
      <div className="iconBar">
        <button>
          <IoRefresh
            className={`iconButton ${spin ? "spin" : ""}`}
            color="var(--color-black)"
            size={20}
            onClick={getFeed}
          />
        </button>
      </div>

      <div className="feedList test">
        {feedData.map(
          ({
            Id,
            AuthorNickname,
            Content,
            Date,
            Comments,
            Likes,
            UserLike,
          }) => (
            <div key={Id}>
              <Tweet
                id={Id}
                author={AuthorNickname}
                content={Content}
                date={Date}
                comments={Comments}
                likes={Likes}
                userLike={UserLike}
              />
            </div>
          )
        )}
      </div>
      <Textarea content={content} setContent={setContent} addOne={addTweet} />
    </>
  );
};

export default Feed;
