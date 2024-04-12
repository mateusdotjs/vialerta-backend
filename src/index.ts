import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as loginRoute } from "./routes/auth/login";
import { router as registerRoute } from "./routes/auth/register";
import { router as logoutRoute } from "./routes/auth/logout";
import { router as ocorrenciasRoute } from "./routes/ocorrencias";
import { router as userRoute } from "./routes/auth/user";
import { router as linhasRoute } from "./routes/linhas";

const port = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);
app.use("/ocorrencias", ocorrenciasRoute);
app.use("/user", userRoute);
app.use("/linhas", linhasRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
