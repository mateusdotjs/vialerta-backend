import express,{ Request, Response } from "express";
import prisma from "../../../prisma/client";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.json({ error: "Preencha todos os campos" });
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
    res.status(403);
    if (error instanceof Error) return res.json(error.message);
  }
});

export { router };
