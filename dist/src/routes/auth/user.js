"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT_1 = __importDefault(require("../../middlewares/verifyJWT"));
const router = express_1.default.Router();
exports.router = router;
router.use(verifyJWT_1.default);
router.get("/", async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        const { payload } = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET);
        return res.status(200).json({
            auth: true,
            userId: payload.id,
            userName: payload.name,
        });
    }
    catch (error) {
        res.status(401);
        if (error instanceof Error)
            return res.json({ error: error.message });
    }
});
