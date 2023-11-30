import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

/* get comments */
router.get("", async (req: any, res: any) => {
  try {
    /* todo */
    const { TweetId } = req.query;
    const result = await prisma.comment.findMany({
      where: {
        TweetId: parseInt(TweetId), // need to parse into Int
      },
    });
    res.send(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

/* add comment */
router.post("", async (req: any, res: any) => {
  try {
    /* todo */
    const { TweetId, AuthorNickname, Content } = req.body;
    console.log("comment info: ", TweetId, AuthorNickname, Content);
    const result = await prisma.comment.create({
      data: {
        // Id: 0, // autoincremented
        TweetId: TweetId,
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

export default router;
