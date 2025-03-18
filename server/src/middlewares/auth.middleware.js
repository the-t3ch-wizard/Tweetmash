"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const utils_1 = require("../lib/utils");
const env_1 = require("../config/env");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authToken } = req.cookies;
    if (!authToken) {
        return res.status(401).json((0, utils_1.errorResponse)(401, "No token provided"));
    }
    const decoded = jsonwebtoken_1.default.verify(authToken, env_1.env.JWTSECRETKEY);
    if (!decoded) {
        return res.status(401).json((0, utils_1.errorResponse)(401, "Invalid token"));
    }
    req.user = {
        userId: decoded.id,
        name: decoded.name,
        email: decoded.email
    };
    next();
});
exports.authMiddleware = authMiddleware;
