import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";

const LoginPage = () => {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  // const goToMain = () => {
  //   navigate("/main");
  // };

  const userLogin = () => {
    const asyncFun = async () => {
      await axios.post(SAPIBase + "/auth/login", {
        nickname,
        password,
      });
    };
    asyncFun().catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
  };

  return (
    <>
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
      <button onClick={userLogin}>Login</button>
    </>
  );
};

export default LoginPage;
