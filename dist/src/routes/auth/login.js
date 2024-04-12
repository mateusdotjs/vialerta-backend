"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../../../prisma/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
exports.router = router;
router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.cookies);
    if (!email || !password) {
        return res.json({ error: "Preencha todos os campos" });
    }
    try {
        const user = await client_1.default.users.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("Usuário ou senha incorretos");
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            throw new Error("Usuário ou senha incorretos");
        }
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        const accessToken = jsonwebtoken_1.default.sign({ payload }, process.env.JWT_SECRET
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
    }
    catch (error) {
        res.status(401);
        if (error instanceof Error)
            return res.json({ error: error.message });
    }
});
