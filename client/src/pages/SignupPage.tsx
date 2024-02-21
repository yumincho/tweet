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

  const nicknameMinLen = 2;
  const nicknameMaxLen = 20;
  const passwordMinLen = 4;
  const passwordMaxLen = 191;

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
    asyncFun()
      .then(async () => {
        await axios.post(
          SAPIBase + "/auth/login",
          {
            nickname,
            password,
          },
          { withCredentials: true }
        );
      })
      .then(() => navigate("/main"))
      .catch((e) => window.alert(`AN ERROR OCCURED! ${e}`));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default action
    userSignUp();
  };

  /* Nickname validation */
  const isNicknameInputValid = () => {
    if (
      activateNicknameInput &&
      nickname.length >= nicknameMinLen &&
      nickname.length <= nicknameMaxLen &&
      !nicknameExist
    )
      return true;
    else return false;
  };

  const nicknameInputValidationMessage = () => {
    if (!activateNicknameInput) return "";
    else if (nickname.length < nicknameMinLen)
      return `Nickname should contain at least ${nicknameMinLen} characters.`;
    else if (nickname.length > nicknameMaxLen)
      return `Nickname should contain at most ${nicknameMaxLen} characters.`;
    else if (nicknameExist)
      return "You can't use this nickname. Please try again.";
  };

  const nicknameInputValidationStatus = () => {
    if (!activateNicknameInput) return "";
    else if (!isNicknameInputValid()) return "invalid";
    else return "valid";
  };

  /* PW validation */
  const reg = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,}$$/;

  const isPWInputValid = () => {
    if (
      activatePWInput &&
      password.length >= passwordMinLen &&
      password.match(reg)
    )
      return true;
    else return false;
  };

  const pwInputValidationMessage = () => {
    if (!activatePWInput) return "";
    else if (password.length < passwordMinLen)
      return `Password should contain at least ${passwordMinLen} characters.`;
    else if (password.length > passwordMaxLen)
      return `Password should contain at most ${passwordMaxLen} characters.`;
    else if (!reg.test(password)) {
      return `Password should contain both letter and digit. (e.g., aa11)`;
    }
  };

  const pwInputValidationStatus = () => {
    if (!activatePWInput) return "";
    else if (!isPWInputValid()) return "invalid";
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
              color="var(--color-red-700)"
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
              color="var(--color-red-700)"
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
