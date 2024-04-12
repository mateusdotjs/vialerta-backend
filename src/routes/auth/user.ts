import express, { Request, Response } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import verifyJWT from "../../middlewares/verifyJWT";

const router = express.Router();

router.use(verifyJWT);

router.get("/", async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.accessToken;
    const { payload } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    return res.status(200).json({
      auth: true,
      userId: payload.id,
      userName: payload.name,
    });
  } catch (error) {
    res.status(401);
    if (error instanceof Error) return res.json({ error: error.message });
  }
});

export { router };
