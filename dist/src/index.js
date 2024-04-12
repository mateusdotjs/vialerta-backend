"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const login_1 = require("./routes/auth/login");
const register_1 = require("./routes/auth/register");
const logout_1 = require("./routes/auth/logout");
const ocorrencias_1 = require("./routes/ocorrencias");
const user_1 = require("./routes/auth/user");
const linhas_1 = require("./routes/linhas");
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use("/login", login_1.router);
app.use("/register", register_1.router);
app.use("/logout", logout_1.router);
app.use("/ocorrencias", ocorrencias_1.router);
app.use("/user", user_1.router);
app.use("/linhas", linhas_1.router);
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
