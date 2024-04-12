"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function verifyJWT(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ error: "Não autenticado" });
    }
    const isValid = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
    if (!isValid) {
        res.cookie("accessToken", "", {
            httpOnly: true,
            maxAge: 0,
        });
        return res.json({ auth: false });
    }
    next();
}
exports.default = verifyJWT;
