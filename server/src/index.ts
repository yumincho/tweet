import express from "express";
import cors from "cors";

import authRouter from "./routes/auth";
import tweetRouter from "./routes/tweet";
import commentRouter from "./routes/comment";

const app = express();
const port = process.env.PORT;

app.use(express.json());

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    console.log("[REQUEST-CORS] Request from origin: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not Allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/tweet", tweetRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`Example App Listening @ http://localhost:${port}`);
});
