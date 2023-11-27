import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.post("/signup", async (req: any, res: any) => {
  try {
    const { nickname, password } = req.body;
    const result = await prisma.user.create({
      data: { nickname, password },
    });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.get("/main", async (req: any, res: any) => {
  try {
    res.send("login success");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

const isExistUser = async (nickname: string, password: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      nickname: nickname,
      password: password,
    },
  });
  return userInfo;
};

router.get("/nickname", async (req: any, res: any) => {
  try {
    res.send(req.session.user.nickname);
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

      /* todo: db에 로그인 여부 저장 */
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/logout", async (req: any, res: any) => {
  try {
    if (req.session.user) {
      req.session.user = null;

      /* todo: db에서 로그인 정보 제거 */

      res.end();
    } else {
      /* todo */
      console.log("not authorized");
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;
