import "./App.css";

import Feed from "./components/Feed";
import Textarea from "./components/widgets/Textarea";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <>
      <div className="container test">
        <div className="leftContainer test">
          <UserInfo />
        </div>

        <div className="rightContainer test">
          <Feed />
          <Textarea />
        </div>
      </div>
    </>
  );
}

export default App;
