import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
import session from "express-session";

import authRouter from "./routes/auth";
import tweetRouter from "./routes/tweet";
import commentRouter from "./routes/comment";

import "dotenv/config";

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());

const hour = 60 * 60 * 1000;
const minute = 60 * 1000;

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: true,
    // store: new MemoryStore(),
    cookie: {
      expires: new Date(Date.now() + 30 * minute),
      // httpOnly: true,
      // sameSite: "none",
      // secure: true,
    },
  })
);

const whitelist = [
  "http://localhost:5173",
  "https://yumyum.newbie.sparcsandbox.com/",
];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    console.log("[REQUEST-CORS] Request from origin: ", origin);
    if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
    else callback(new Error("Not Allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/auth", authRouter);
app.use("/tweet", tweetRouter);
app.use("/comment", commentRouter);

app.listen(port, () => {
  console.log(`Example App Listening @ http://localhost:${port}`);
});
