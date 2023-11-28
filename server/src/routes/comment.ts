import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

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

router.post("", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
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
