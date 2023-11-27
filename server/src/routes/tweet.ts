import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

/* get tweet */
router.get("", async (req: any, res: any) => {
  try {
    /* todo */
    const result = await prisma.tweet.findMany({
      select: {
        Id: true,
        AuthorNickname: true,
        Content: true,
        Date: true,
      },
    });
    res.send(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

/* add tweet */
router.post("", async (req: any, res: any) => {
  try {
    /* todo */
    const { Id, AuthorNickname, Content } = req.body;
    const result = await prisma.tweet.create({
      data: {
        Id: Id,
        AuthorNickname: AuthorNickname,
        Content: Content,
        Date: new Date(),
      },
    });
    res.send(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.delete("", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/like", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.delete("/like", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;
