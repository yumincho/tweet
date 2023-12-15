import React from "react";
// import { useContext } from "react";
import axios from "axios";
import { SAPIBase } from "../tools/api";

// import Textarea from "../components/widgets/Textarea";
import UserInfo from "../components/sections/UserInfo";
import Calendar from "../components/widgets/Calendar";
import UserInfoContext from "../components/contexts/userInfoContext";

interface ChildrenProps {
  children: JSX.Element;
}

const MainPage: React.FC<ChildrenProps> = ({ children }) => {
  const [userNickname, setUserNickname] = React.useState("");
  const [userTweetNum, setUserTweetNum] = React.useState(0);
  const [userCommentNum, setUserCommentNum] = React.useState(0);
  const [userLikeNum, setUserLikeNum] = React.useState(0);

  const getUserNickname = () => {
    const userNickname = async () => {
      // const userNickname = await axios.get(SAPIBase + "/auth/nickname");

      const userInfo = await axios.get(SAPIBase + "/auth/userInfo");
      const { nickname, tweetNum, commentNum, likeNum } = userInfo.data;
      console.log("get data: ", nickname, tweetNum, commentNum, likeNum);
      setUserNickname(nickname);
      setUserTweetNum(tweetNum);
      setUserCommentNum(commentNum);
      setUserLikeNum(likeNum);
    };
    userNickname();
  };

  React.useEffect(getUserNickname, [userNickname]);

  return (
    <UserInfoContext.Provider value={{ nickname: userNickname }}>
      <div className="container">
        <div className="leftContainer test">
          <UserInfo
            nickname={userNickname}
            tweetNum={userTweetNum}
            commentNum={userCommentNum}
            likeNum={userLikeNum}
          />
          <Calendar />
        </div>

        <div className="rightContainer test">{children}</div>
      </div>
    </UserInfoContext.Provider>
  );
};

export default MainPage;
