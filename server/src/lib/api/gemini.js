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
Object.defineProperty(exports, "__esModule", { value: true });
exports.continueChatUsingGemini = void 0;
const generative_ai_1 = require("@google/generative-ai");
const env_1 = require("../../config/env");
const continueChatUsingGemini = (history, message) => __awaiter(void 0, void 0, void 0, function* () {
    // FIX
    const genAI = new generative_ai_1.GoogleGenerativeAI(env_1.env.GOOGLE_GENAI_API_KEY);
    const model = genAI.getGenerativeModel({
        // model: "gemini-1.5-flash",
        // model: "gemini-1.5-flash-8b",
        model: "gemini-2.0-flash-lite-preview-02-05",
        systemInstruction: "You are a highly knowledgeable and professional assistant specializing in job interview preparation. Your role is to provide personalized and relevant content based on the user’s input, including resume optimization, tailored responses for specific job positions, and industry-specific interview preparation tips. Always offer practical advice, clear explanations, and resources to help users succeed in their interviews. Be concise, yet detailed, and ensure that all content aligns with professional standards and the requirements of the job role described by the user. NOTE: Provide answer in a structured format and do not add unnecessary spacing and gap between lines in your reply."
    });
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        // maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
    const chatSession = model.startChat({
        generationConfig,
        history: history.map((msg) => ({
            role: msg.role,
            parts: msg.parts
        }))
    });
    const replyFromAi = yield chatSession.sendMessage(message);
    return replyFromAi.response.text();
});
exports.continueChatUsingGemini = continueChatUsingGemini;
