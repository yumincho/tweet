import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SAPIBase } from "../tools/api";
import { css } from "@emotion/css";

import { IoAlertCircle } from "react-icons/io5";

axios.defaults.withCredentials = true;

const SignupPage = () => {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nicknameExist, setnicknameExist] = React.useState(false);
  const [activateNicknameInput, setActivateNicknameInput] =
    React.useState(false);
  const [activatePWInput, setActivatePWInput] = React.useState(false);

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

  React.useEffect(() => {
    /* false when nickname exists */
    const checkUserNickname = () => {
      const asyncFunc = async () => {
        const { data } = await axios.get(SAPIBase + "/auth/nicknameExist", {
          params: {
            nickname: nickname,
          },
        });
        setnicknameExist(data);
      };
      asyncFunc();
    };

    const timer = setTimeout(() => {
      checkUserNickname();
    }, 250);

    return () => clearTimeout(timer);
  }, [nickname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "nickname") setNickname(value);
    else if (name === "password") setPassword(value);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLButtonElement;
    if (name === "nickname") {
      if (!activateNicknameInput) {
        setActivateNicknameInput(true);
      }
    } else if (name === "password") {
      if (!activatePWInput) {
        setActivatePWInput(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default action
    userSignUp();
  };

  const isNicknameInputValid = () => {
    if (activateNicknameInput && nickname !== "" && !nicknameExist) return true;
    else return false;
  };

  const nicknameInputValidationMessage = () => {
    if (!activateNicknameInput) return "";
    else if (nickname == "") return "Nickname can't be blank.";
    else if (nicknameExist)
      return "You can't use this nickname. Please try again.";
  };

  const nicknameInputValidationStatus = () => {
    if (!activateNicknameInput) return "";
    else if (nicknameExist || nickname === "") return "invalid";
    else return "valid";
  };

  const isPWInputValid = () => {
    if (activatePWInput && password !== "") return true;
    else return false;
  };

  const pwInputValidationMessage = () => {
    if (!activatePWInput) return "";
    else if (password == "") return "Password can't be blank.";
  };

  const pwInputValidationStatus = () => {
    if (!activatePWInput) return "";
    else if (password === "") return "invalid";
    else return "valid";
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
        No account?
        <br />
        Sign Up for an Account 🙌
      </h2>
      <form className="inputForm" onSubmit={handleSubmit}>
        <div className="inputDiv">
          <label className="inputLabel">Nickname</label>
          <input
            type="text"
            name="nickname"
            className={`inputInput ${nicknameInputValidationStatus()}`}
            placeholder="nickname"
            value={nickname}
            onClick={handleClick}
            onChange={handleChange}
          />
          <div className="inputMessage">{nicknameInputValidationMessage()}</div>
          {nickname !== "" && !isNicknameInputValid() ? (
            <IoAlertCircle
              className="validIcon"
              size="28"
              color="var(--color-red)"
            />
          ) : (
            ""
          )}
        </div>
        <div className="inputDiv">
          <label className="inputLabel">Password</label>
          <input
            type="password"
            name="password"
            className={`inputInput ${pwInputValidationStatus()}`}
            placeholder="password"
            value={password}
            onClick={handleClick}
            onChange={handleChange}
          />
          <div className="inputMessage">{pwInputValidationMessage()}</div>
          {password !== "" && !isPWInputValid() ? (
            <IoAlertCircle
              className="validIcon"
              size="28"
              color="var(--color-red)"
            />
          ) : (
            ""
          )}
        </div>
        <div className="submitInputDiv">
          <input
            disabled={!isNicknameInputValid() || !isPWInputValid()}
            type="submit"
            className="primaryButton"
            value="Sign up"
          />
        </div>
      </form>

      <button className="textButton" onClick={() => navigate("/")}>
        Log in
      </button>
    </div>
  );
};

export default SignupPage;
