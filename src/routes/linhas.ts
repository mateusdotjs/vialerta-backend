import express, { Request, Response } from "express";
import verifyJWT from "../middlewares/verifyJWT";
import { getAll, getOne } from "./helpers/getStatus";
const router = express.Router();

router.use(verifyJWT);

router.get("/", async (req: Request, res: Response) => {
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const linhas = getAll(html);
    res.status(200).json({ linhas });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await fetch("https://www.viamobilidade.com.br/");
    const html = await response.text();
    const linhas = getAll(html);
    const linha = getOne(linhas, id);
    res.status(200).json( linha );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message == "Linha inexistente") {
        res.status(404);
      } else {
        res.status(500);
      }

      res.json({ error: error.message });
    }
  }
});

export { router };
