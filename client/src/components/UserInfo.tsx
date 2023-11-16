import "./UserInfo.css";

const UserInfo = () => {
  return (
    <div className="containerItem userInfo test">
      <strong>nickname</strong>
      <button style={{ fontSize: "var(--font-size-small)" }}>logout</button>
    </div>
  );
};

export default UserInfo;
