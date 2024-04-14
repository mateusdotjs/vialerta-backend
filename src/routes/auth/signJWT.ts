import { Response } from "express";
import jwt from "jsonwebtoken";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
};

export function signJWT(res: Response, user: User) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const accessToken = jwt.sign({ payload }, process.env.JWT_SECRET as string);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });
}
