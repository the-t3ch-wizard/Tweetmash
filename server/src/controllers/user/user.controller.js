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
exports.user = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../../lib/logger");
const utils_1 = require("../../lib/utils");
const env_1 = require("../../config/env");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../../models/user.model");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Signup user");
    const { name, email, password } = req.body;
    const existingUser = yield user_model_1.User.findOne({
        email,
    });
    if (existingUser)
        return res
            .status(409)
            .json((0, utils_1.errorResponse)(409, "User with same email already exists"));
    const newUser = yield user_model_1.User.create({
        name,
        email,
        password,
    });
    const token = jsonwebtoken_1.default.sign({
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    }, env_1.env.JWTSECRETKEY, {
        expiresIn: "7d",
    });
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    // had to set options for token as per mode of server
    return res.status(200).json((0, utils_1.successResponse)(200, "User signed up successfully", {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    }));
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Login user");
    const { email, password } = req.body;
    let userFound = yield user_model_1.User.findOne({
        email,
    });
    if (!userFound) {
        return res.status(400).json((0, utils_1.errorResponse)(400, "User not found"));
    }
    const passwordMatched = yield bcrypt_1.default.compare(password, userFound.password);
    if (!passwordMatched) {
        return res.status(401).json((0, utils_1.errorResponse)(401, "Wrong password"));
    }
    const token = jsonwebtoken_1.default.sign({
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
    }, env_1.env.JWTSECRETKEY, {
        expiresIn: "7d",
    });
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    // had to set options for token as per mode of server
    return res.status(200).json((0, utils_1.successResponse)(200, "User logged in successfully", {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
    }));
});
const whoAmI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Who am i");
    const { authToken } = req.cookies;
    if (!authToken) {
        return res.status(401).json((0, utils_1.errorResponse)(401, "No token provided"));
    }
    const decoded = jsonwebtoken_1.default.verify(authToken, env_1.env.JWTSECRETKEY);
    if (!decoded) {
        return res.status(401).json((0, utils_1.errorResponse)(401, "Invalid token"));
    }
    const existingUser = yield user_model_1.User.findOne({
        _id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
    });
    if (!existingUser) {
        return res
            .status(401)
            .json((0, utils_1.errorResponse)(401, "Invalid token: User not found"));
    }
    return res.status(200).json((0, utils_1.successResponse)(200, "User details fetched successfully", {
        _id: decoded === null || decoded === void 0 ? void 0 : decoded.id,
        name: decoded === null || decoded === void 0 ? void 0 : decoded.name,
        email: decoded === null || decoded === void 0 ? void 0 : decoded.email,
    }));
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Logout user");
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    // had to set options for token as per mode of server
    return res
        .status(200)
        .json((0, utils_1.successResponse)(200, "User logged out successfully", null));
});
exports.user = {
    signup,
    login,
    whoAmI,
    logout,
};
