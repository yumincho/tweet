import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import { css } from "@emotion/css";

axios.defaults.withCredentials = true;

const SignupPage = () => {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const userSignUp = () => {
    const asyncFun = async () => {
      await axios.post(
        SAPIBase + "/auth/signup",
        {
          nickname,
          password,
        },
        { withCredentials: true }
      );
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h2
        className={css`
          margin-bottom: 64px;
        `}
      >
        No account?
        <br />
        Sign Up for an Account 🙌
      </h2>
      <form
        className={css`
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-bottom: 16px;
        `}
        onSubmit={(e) => {
          e.preventDefault(); // prevent default onSubmit action?
          userSignUp();
        }}
      >
        <div className="inputDiv">
          <label className="inputLabel">Nickname</label>
          <input
            type="text"
            name="nickname"
            placeholder="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="inputDiv">
          <label className="inputLabel">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" className="primaryButton" value="Sign up" />
        </div>
      </form>

      <button className="textButton" onClick={() => navigate("/")}>
        Log in
      </button>
    </div>
  );
};

export default SignupPage;
