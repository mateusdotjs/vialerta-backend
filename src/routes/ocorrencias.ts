import express, { Request, Response } from "express";
import prisma from "../../prisma/client";
import verifyJWT from "../middlewares/verifyJWT";
import { validateTime } from "./helpers/validadeTime";
import { validateType } from "./helpers/validateType";
const router = express.Router();

router.use(verifyJWT);

router.get("/", async (req: Request, res: Response) => {
  const { type, time } = req.query as { type: string; time: string };

  const timestamp = validateTime(time);

  if (!timestamp || !validateType(type)) {
    return res.status(401).json({ error: "Requisição incorreta" });
  }

  try {
    const ocorrencias = await prisma.ocorrencias.findMany({
      where: {
        createdAt: {
          gte: timestamp,
        },
        type: type === "Todas" ? undefined : type,
      },

      select: {
        linha: true,
        type: true,
      },
    });

    const count = ocorrencias.length;
    res.json({ ocorrencias, count });
  } catch (error) {
    console.log(error);
    res.json({ error: "Erro ao recuperar ocorrências" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, time } = req.query as { type: string; time: string };

  const timestamp = validateTime(time);

  if (!timestamp || !validateType(type)) {
    return res.status(401).json({ error: "Requisição incorreta" });
  }

  try {
    const ocorrencias = await prisma.ocorrencias.findMany({
      where: {
        linha: id,
        createdAt: {
          gte: timestamp,
        },
        type: type === "Todas" ? undefined : type,
      },
      select: {
        linha: true,
        type: true,
      },
    });

    const count = ocorrencias.length;
    res.json({ ocorrencias, count });
  } catch (error) {
    res.status(400).json({ error: "Erro ao recuperar ocorrências" });
  }
});

router.post("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, authorId } = req.body;

  if (!type || !authorId || !validateType(type)) {
    return res.status(401).json({ error: "Requisição incorreta" });
  }

  try {
    const ocorrencia = await prisma.ocorrencias.create({
      data: {
        linha: id,
        type,
        authorId,
      },
    });

    res.status(200).json({ ocorrencia });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao enviar ocorrência." });
  }
});

export { router };
