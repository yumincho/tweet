import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";

import "./UserInfo.css";

const UserInfo = () => {
  const [nickname, setNickname] = React.useState("");

  const navigate = useNavigate();

  const userNickname = async () => {
    const userNickname = await axios.get(SAPIBase + "/auth/nickname");
    setNickname(userNickname.data);
  };

  const userLogout = () => {
    const asyncFun = async () => {
      await axios.post(
        SAPIBase + "/auth/logout",
        {
          nickname,
        },
        { withCredentials: true }
      );

      navigate("/");
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  const userLogin = () => {
    navigate("/login");
  };

  userNickname();

  return nickname ? (
    <div className="containerItem userInfo test">
      <strong>{nickname} 님 🙌 </strong>
      <button
        style={{ fontSize: "var(--font-size-small)" }}
        onClick={userLogout}
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="containerItem userInfo test">
      <strong> 로그인이 필요합니다. </strong>
      <button
        style={{ fontSize: "var(--font-size-small)" }}
        onClick={userLogin}
      >
        Login
      </button>
    </div>
  );
};

export default UserInfo;
