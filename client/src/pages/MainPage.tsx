import React from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";

import Feed from "../components/Feed";
import Textarea from "../components/widgets/Textarea";
import UserInfo from "../components/UserInfo";
import Calendar from "../components/Calendar";

const MainPage = () => {
  const [lastId, setLastId] = React.useState(0);
  const [tweetCount, setTweetCount] = React.useState<number>(0);

  const getLastId = async () => {
    const lastId = await axios.get(SAPIBase + "/tweet/lastId");
    setLastId(lastId.data.Id + 1);
  };

  getLastId().then(() => {
    setTweetCount(lastId);
  });

  const [nickname, setNickname] = React.useState("");
  const userNickname = async () => {
    const userNickname = await axios.get(SAPIBase + "/auth/nickname");
    setNickname(userNickname.data);
  };

  userNickname();

  return (
    <>
      <div className="container test">
        <div className="leftContainer test">
          <UserInfo />
          <Calendar />
        </div>

        <div className="rightContainer">
          <Feed tweetCount={tweetCount} />
          <Textarea
            nickname={nickname}
            tweetCount={tweetCount}
            setTweetCount={setTweetCount}
          />
        </div>
      </div>
    </>
  );
};

export default MainPage;
