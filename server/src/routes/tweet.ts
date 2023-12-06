import { PrismaClient } from "@prisma/client";
import express from "express";
import dayjs from "dayjs";

const router = express.Router();

const prisma = new PrismaClient();

/* DEPRECATED: get id of the last tweet */
router.get("/lastId", async (req: any, res: any) => {
  try {
    const result = await prisma.tweet.findMany({
      orderBy: {
        Id: "desc",
      },
      take: 1,
    });
    res.send(result[0]);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

/* get tweet */
router.get("", async (req: any, res: any) => {
  try {
    /* get userNickname to check if the user liked each tweet */
    const { userNickname } = req.query;

    /* find tweets */
    const tweets = await prisma.tweet.findMany({
      select: {
        Id: true,
        AuthorNickname: true,
        Content: true,
        Date: true,
      },
    });

    /* count the number of comments and likes*/
    const result = await Promise.all(
      tweets.map(async (tweet) => {
        const comments = await prisma.comment.findMany({
          where: {
            TweetId: tweet.Id,
          },
        });
        const likes = await prisma.like.findMany({
          where: {
            TweetId: tweet.Id,
          },
        });
        const userLike = await prisma.like.findMany({
          where: {
            UserNickname: userNickname,
            TweetId: tweet.Id,
          },
        });
        // console.log(dayjs(tweet.Date).format("YYYY-MM-DD HH:mm"));
        return {
          Id: tweet.Id,
          AuthorNickname: tweet.AuthorNickname,
          Content: tweet.Content,
          Date: dayjs(tweet.Date).format("YYYY-MM-DD HH:mm"),
          Comments: comments.length,
          Likes: likes.length,
          UserLike: userLike.length >= 1,
        };
      })
    );

    res.send(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

/* add tweet */
router.post("", async (req: any, res: any) => {
  try {
    /* todo */
    const { AuthorNickname, Content } = req.body;
    const result = await prisma.tweet.create({
      data: {
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

/* check if the user liked the ownerTweet */
router.get("/like", async (req: any, res: any) => {
  try {
    const { UserNickname, TweetId } = req.query;

    const userLiked = await prisma.like.findMany({
      where: {
        UserNickname: UserNickname,
        TweetId: parseInt(TweetId),
      },
    });

    const likeCount = await prisma.like.findMany({
      where: {
        TweetId: parseInt(TweetId),
      },
    });

    res.send([userLiked.length === 1, likeCount.length]);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/like", async (req: any, res: any) => {
  try {
    const { UserNickname, TweetId } = req.body;

    const result = await prisma.like.create({
      data: {
        UserNickname: UserNickname,
        TweetId: TweetId,
      },
    });
    res.send(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.delete("/like", async (req: any, res: any) => {
  try {
    const { UserNickname, TweetId } = req.body;

    const result = await prisma.like.deleteMany({
      where: {
        UserNickname: UserNickname,
        TweetId: TweetId,
      },
    });
    res.send(result);
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

export default router;
