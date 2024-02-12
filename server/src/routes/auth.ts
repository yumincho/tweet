import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

const isExistNickname = async (nickname: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      nickname: nickname,
    },
  });
  return userInfo;
};

const isExistUser = async (nickname: string, password: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      nickname: nickname,
      password: password,
    },
  });
  return userInfo;
};

/* session checking middleware */
const checkSession = (req: any, res: any, next: any) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({ error: "not authorized" });
  }
};

/* session checking api for loader */
router.get("/checkSession", async (req: any, res: any) => {
  if (req.session.user) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post("/signup", async (req: any, res: any) => {
  try {
    const { nickname, password } = req.body;
    await prisma.user.create({
      data: { nickname, password },
    });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/userInfo", checkSession, async (req: any, res: any) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      AuthorNickname: req.session.user.nickname,
    },
  });
  const comments = await prisma.comment.findMany({
    where: {
      AuthorNickname: req.session.user.nickname,
    },
  });
  const likes = await prisma.like.findMany({
    where: {
      UserNickname: req.session.user.nickname,
    },
  });
  res.send({
    nickname: req.session.user.nickname,
    tweetNum: tweets.length,
    commentNum: comments.length,
    likeNum: likes.length,
  });
});

router.get("/nicknameExist", async (req: any, res: any) => {
  try {
    const { nickname } = req.query;
    const result = await isExistNickname(nickname);
    if (result) {
      // if not null (nickname exist)
      res.send(true);
    } else {
      // if null
      res.send(false);
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    const { nickname, password } = req.body;
    if (req.session.user) {
      /* new login */
      if (
        req.session.user.nickname !== nickname &&
        (await isExistUser(nickname, password))
      ) {
        /* req.session.destroy not works */
        req.session.user = null;

        /*  assign new user */
        req.session.user = {
          nickname: nickname,
        };

        /* session saved */
        req.session.save(() => {
          res.send(nickname);
        });
      }
    } else {
      /* 일치하는 유저 찾기 */
      const userInfo = await isExistUser(nickname, password);

      /* no matching user */
      if (!userInfo) {
        throw new Error("no unique user");
      } else if (
        /* nickname exist, but wrong password */
        userInfo?.nickname == nickname &&
        userInfo.password != password
      ) {
        /* todo */
        throw new Error("wrong password");
      } else {
        /* login success */
        req.session.user = {
          nickname: nickname,
        };
        req.session.save(() => {
          res.end();
        });
      }

      /* todo: db에 로그인 여부 저장? */
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/logout", async (req: any, res: any) => {
  req.session.user = null;

  /* todo: db에서 로그인 정보 제거 */

  res.end();
});

export default router;
