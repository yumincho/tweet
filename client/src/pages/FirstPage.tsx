import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  const goToLogIn = () => {
    navigate("/login");
  };

  return (
    <>
      <div>Hi!</div>
      <button onClick={goToSignup}>SignUp</button>
      <button onClick={goToLogIn}>Login</button>
    </>
  );
};

export default FirstPage;
