import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

router.get("/dummy", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("dummy");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/signup", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
  } catch (e) {
    return res.status(500).json({ error: e });
  }
});

router.post("/login", async (req: any, res: any) => {
  try {
    /* todo */
    res.send("todo");
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
