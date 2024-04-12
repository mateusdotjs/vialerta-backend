"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../../prisma/client"));
const verifyJWT_1 = __importDefault(require("../middlewares/verifyJWT"));
const validadeTime_1 = require("./helpers/validadeTime");
const validateType_1 = require("./helpers/validateType");
const router = express_1.default.Router();
exports.router = router;
router.use(verifyJWT_1.default);
router.get("/", async (req, res) => {
    const { type, time } = req.query;
    const timestamp = (0, validadeTime_1.validateTime)(time);
    if (!timestamp || !(0, validateType_1.validateType)(type)) {
        return res.status(401).json({ error: "Requisição incorreta" });
    }
    try {
        const ocorrencias = await client_1.default.ocorrencias.findMany({
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
    }
    catch (error) {
        console.log(error);
        res.json({ error: "Erro ao recuperar ocorrências" });
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { type, time } = req.query;
    const timestamp = (0, validadeTime_1.validateTime)(time);
    if (!timestamp || !(0, validateType_1.validateType)(type)) {
        return res.status(401).json({ error: "Requisição incorreta" });
    }
    try {
        const ocorrencias = await client_1.default.ocorrencias.findMany({
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
    }
    catch (error) {
        res.status(400).json({ error: "Erro ao recuperar ocorrências" });
    }
});
router.post("/:id", async (req, res) => {
    const { id } = req.params;
    const { type, authorId } = req.body;
    if (!type || !authorId || !(0, validateType_1.validateType)(type)) {
        return res.status(401).json({ error: "Requisição incorreta" });
    }
    try {
        const ocorrencia = await client_1.default.ocorrencias.create({
            data: {
                linha: id,
                type,
                authorId,
            },
        });
        res.status(200).json({ ocorrencia });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Erro interno do servidor." });
        }
    }
});
