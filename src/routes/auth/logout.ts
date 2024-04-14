import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "none",
    secure: true,
  });
  return res.json({ auth: false });
});

export { router };
