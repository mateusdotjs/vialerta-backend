"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../../../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
exports.router = router;
router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.json({ error: "Preencha todos os campos" });
    }
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await client_1.default.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return res.status(200).json({ message: "Registrado com sucesso!" });
    }
    catch (error) {
        res.status(403);
        if (error instanceof Error)
            return res.json(error.message);
    }
});
