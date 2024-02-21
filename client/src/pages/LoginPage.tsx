import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import { css } from "@emotion/css";
import "./LoginPage.css";
import { IoInformationCircleOutline, IoClose } from "react-icons/io5";

axios.defaults.withCredentials = true;

const LoginPage = () => {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginFailed, setIsLoginFailed] = React.useState(false);

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
      setIsLoginFailed(false);
      navigate("/main");
    };
    asyncFun().catch(() => {
      setIsLoginFailed(true);
    });
  };

  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <h2>
        Hi, SPARKY!
        <br />
        Log in to Your Account ⚡️
      </h2>
      <form
        className="inputForm"
        onSubmit={(e) => {
          e.preventDefault(); // prevent default onSubmit action?
          userLogin();
        }}
      >
        {isLoginFailed && (
          <div className="loginFailedDiv">
            <IoInformationCircleOutline size={20} />
            Incorrect nickname or password.
            <IoClose onClick={() => setIsLoginFailed(false)} />
          </div>
        )}
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
        <div className="submitInputDiv">
          <input type="submit" className="primaryButton" value="Log in" />
        </div>
      </form>

      <button className="textButton" onClick={() => navigate("/signup")}>
        Sign up
      </button>
    </div>
  );
};

export default LoginPage;
