import express, { Request, Response } from "express";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  console.log("oi");
  if (!email || !password || !name || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Preencha todos os campos corretamente." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return res.status(200).json({ message: "Registrado com sucesso!" });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({ error: "Email já cadastrado." });
    }
    res.status(500);
    console.log(error);
    return res.json({ error: "Erro ao cadastrar, tente novamente." });
  }
});

export { router };
