import express, { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { signJWT } from "./signJWT";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Usuário ou senha incorretos." });
    }

    signJWT(res, user);

    return res
      .status(200)
      .json({ auth: true, userId: user.id, userName: user.name });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Erro ao fazer login, tente novamente." });
  }
});

export { router };
