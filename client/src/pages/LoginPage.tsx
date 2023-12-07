import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import { css } from "@emotion/css";

axios.defaults.withCredentials = true;

const LoginPage = () => {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const userLogin = () => {
    const asyncFun = async () => {
      await axios.post(
        SAPIBase + "/auth/login",
        {
          nickname,
          password,
        },
        { withCredentials: true }
      );
      navigate("/main");
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        gap: 16px;
      `}
    >
      <h2>Welcome!</h2>
      <input
        placeholder="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="styledButton" onClick={userLogin}>
        Login
      </button>
      <button onClick={() => navigate("/signup")}>Sign up</button>
    </div>
  );
};

export default LoginPage;
