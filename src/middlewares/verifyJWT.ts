import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  const isValid = jwt.verify(accessToken, process.env.JWT_SECRET as string);
  console.log(isValid);

  if (!isValid) {
    res.cookie("accessToken", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "none",
      secure: true,
    });

    return res.json({ auth: false });
  }

  next();
}

export default verifyJWT;
