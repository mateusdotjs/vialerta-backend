"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const getStatus_1 = require("./helpers/getStatus");
const router = express_1.default.Router();
exports.router = router;
router.use(verifyJWT_1.default);
router.get("/", async (req, res) => {
    try {
        const response = await fetch("https://www.viamobilidade.com.br/");
        const html = await response.text();
        const linhas = (0, getStatus_1.getAll)(html);
        res.status(200).json({ linhas });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch("https://www.viamobilidade.com.br/");
        const html = await response.text();
        const linhas = (0, getStatus_1.getAll)(html);
        const linha = (0, getStatus_1.getOne)(linhas, id);
        res.status(200).json(linha);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.message == "Linha inexistente") {
                res.status(404);
            }
            else {
                res.status(500);
            }
            res.json({ error: error.message });
        }
    }
});
