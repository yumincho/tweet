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

router.post("/login", async (req: any, res: any) => {
  try {
    const { nickname, password } = req.body;

    const userList = await prisma.user.findMany({
      select: {
        nickname: true,
        password: true,
      },
      where: {
        nickname: nickname,
      },
    });

    if (userList.length != 1) throw new Error("no unique user");

    const user = userList[0];

    if (user.nickname === nickname) {
      if (user.password === password) {
        console.log("login succeess");
      } else {
        console.log("password: WRONG");
        throw new Error("password: WRONG");
      }
    } else {
      console.log("nickname: NO DATA");
      throw new Error("nickname: NO DATA");
    }
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/logout", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;
