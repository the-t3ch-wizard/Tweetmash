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
exports.twitter = void 0;
const env_1 = require("../../config/env");
const utils_1 = require("../../lib/utils");
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
const authorize = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    let data = qs_1.default.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: env_1.env.FRONTEND_URL,
        code_verifier: "challenge",
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.twitter.com/2/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic UTFwS0xUUndRVWd6Ym1Nek56Rk9UVW94Umt3Nk1UcGphUTpIeWdLU1dNaFh0Ny0xNGxvbkRQdS1oYnROUC0xUmp1YjYtTzA1bTFlZ2djWFoxamRkSQ==',
            'Cookie': '__cf_bm=0_BPwE6XnxnxFRYnXX3akzw6GQExUOXAbA4Xx3SZhWw-1742338848-1.0.1.1-Ik2yK0pJeLZl6Q401a8n1irpu0T4UqQxNFxHrQ2QUT2lmVuuqevM1vOqEaHszD41G4upRQV5TP.7M2ZktMcQXPC4bJC5be4_r0KB58Eteug; guest_id=v1%3A174232347687444935; guest_id_ads=v1%3A174232347687444935; guest_id_marketing=v1%3A174232347687444935; personalization_id="v1_xVlIIR0LVcg95qkbM9gadA=="'
        },
        data: data
    };
    const { data: twitterToken } = yield axios_1.default.request(config);
    res.cookie("twitterToken", twitterToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    return res.status(200).json((0, utils_1.successResponse)(200, "Twitter authorized successfully", null));
});
exports.twitter = {
    authorize,
};
