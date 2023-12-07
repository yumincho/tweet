import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../../tools/api";

import "./UserInfo.css";

interface Props {
  nickname: string;
}

const UserInfo: React.FC<Props> = ({ nickname }) => {
  const navigate = useNavigate();

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

  return nickname !== "" ? (
    <div className="containerItem userInfo test">
      <strong>{nickname} 님 🙌 </strong>
      <button className="secondaryButton" onClick={userLogout}>
        Logout
      </button>
    </div>
  ) : (
    <div className="containerItem userInfo test">
      <strong> 로그인이 필요합니다. </strong>
      <button className="secondaryButton" onClick={userLogin}>
        Login
      </button>
    </div>
  );
};

export default UserInfo;
