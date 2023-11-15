import express from "express";

import authRouter from "./routes/auth";
import tweetRouter from "./routes/tweet";
import commentRouter from "./routes/comment";

const app = express();
const port = process.env.PORT;

app.use("/auth", authRouter);
app.use("/tweet", tweetRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`Example App Listening @ http://localhost:${port}`);
});
