import express, { Request, Response } from "express";
import prisma from "../../../prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.cookies);

  if (!email || !password) {
    return res.json({ error: "Preencha todos os campos" });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorretos");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Usuário ou senha incorretos");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(
      { payload },
      process.env.JWT_SECRET as string
      // { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ auth: true, userId: user.id, userName: user.name })
      .send();
  } catch (error) {
    res.status(401);
    if (error instanceof Error) return res.json({ error: error.message });
  }
});

export { router };
