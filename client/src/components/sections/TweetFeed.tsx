import "./TweetFeed.css";

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import { SAPIBase } from "../../tools/api";

import Comment from "../widgets/Comment";
import Textarea from "../widgets/Textarea";
import OwnerTweet from "../widgets/OwnerTweet";
import { IoRefresh, IoArrowBack } from "react-icons/io5";

import { useUserInfoStore } from "../../storage/user";

interface TweetFeedData {
  Id: number;
  AuthorNickname: string;
  Content: string;
  Date: string;
}

const TweetFeed = () => {
  const [tweetFeedData, setTweetFeedData] = React.useState<TweetFeedData[]>([]);

  /* get tweetId from URL */
  const { state } = useLocation();
  const { tweetId, tweetAuthor, tweetContent, tweetDate } = state;

  /* manage content from textarea */
  const [content, setContent] = React.useState("");

  /* get user nickname from the global store */
  const { nickname, increaseComment, increaseLike, decreaseLike } =
    useUserInfoStore();

  /* track if the user press enter */
  const canSubmit = React.useRef(true);

  /* api call when the user add new comment */
  const addComment = async () => {
    await axios.post(SAPIBase + "/comment", {
      TweetId: tweetId,
      AuthorNickname: nickname,
      Content: content,
    });
    setContent("");
    increaseComment();
    getTweetFeed();

    /* prevent duplicated submit */
    if (content === "") canSubmit.current = true;
  };

  const [spin, setSpin] = React.useState(false);

  /* reload feed when the user add new tweet */
  const getTweetFeed = () => {
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 1000);
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
  React.useEffect(getTweetFeed, [tweetId]);

  /* navigation */
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate("/main");
  };

  /* manage likes */
  const [like, setLike] = React.useState(false);
  const [countComments, setCountComments] = React.useState(0);

  // check the number of likes
  const checkLike = () => {
    const checkLikeFunc = async () => {
      const result = await axios.get(SAPIBase + "/tweet/like", {
        params: {
          UserNickname: nickname,
          TweetId: tweetId,
        },
      });

      setLike(result.data[0]);
      setCountComments(result.data[1]);
    };
    checkLikeFunc();
  };

  React.useEffect(checkLike, [nickname, tweetId, like]);

  const clickLike = async () => {
    await axios.post(SAPIBase + "/tweet/like", {
      UserNickname: nickname,
      TweetId: tweetId,
    });
    setLike(true);
    increaseLike();
  };

  const clickDislike = async () => {
    await axios.delete(SAPIBase + "/tweet/like", {
      data: {
        UserNickname: nickname,
        TweetId: tweetId,
      },
    });
    setLike(false);
    decreaseLike();
  };

  return (
    <>
      <div className="iconBar">
        <button>
          <IoRefresh
            className={`iconButton ${spin ? "spin" : ""}`}
            color="var(--color-black)"
            size={20}
            onClick={getTweetFeed}
          />
        </button>
        <button className="iconButton">
          <IoArrowBack
            color="var(--color-black)"
            size={20}
            onClick={onBackClick}
          />
        </button>
      </div>
      <OwnerTweet
        id={tweetId}
        author={tweetAuthor}
        content={tweetContent}
        date={tweetDate}
        tweetFeedData={tweetFeedData}
        clickLike={clickLike}
        clickDislike={clickDislike}
        like={like}
        countComments={countComments}
      />
      {/* comments */}
      <div className="tweetFeed">
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
      </div>
      {/* text input field */}
      <Textarea
        content={content}
        setContent={setContent}
        addOne={addComment}
        canSubmit={canSubmit}
      />
    </>
  );
};

export default TweetFeed;
