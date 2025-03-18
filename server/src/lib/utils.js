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
exports.encodeBase64 = exports.convertFileUrlToBase64 = exports.errorHandler = exports.errorResponse = exports.successResponse = exports.asyncHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("./logger");
const asyncHandler = (fn) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fn(req, res, next);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json((0, exports.errorResponse)(500, error.message || "An error occurred"));
    }
});
exports.asyncHandler = asyncHandler;
const successResponse = (statusCode, message = "Req successful", data) => {
    logger_1.logger.info(`RESPONSE: ${statusCode} ${message}`);
    // logger.success(`RESPONSE: ${statusCode} ${message}`);
    return {
        statusCode,
        success: true,
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = (statusCode, message = "An error occurred", errors = []) => {
    logger_1.logger.error(`ERROR: ${statusCode} ${message}`);
    return {
        statusCode,
        success: false,
        message,
        errors,
    };
};
exports.errorResponse = errorResponse;
const errorHandler = (err, req, res, next) => {
    // Optionally send error to an external monitoring service
    // e.g., logErrorToMonitoringService(err);
    res.status(500).json((0, exports.errorResponse)(500, "Internal Server Error"));
};
exports.errorHandler = errorHandler;
const convertFileUrlToBase64 = (fileUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(fileUrl, { responseType: 'arraybuffer' }); // Fetch the file as an array buffer
    const base64 = Buffer.from(response.data).toString('base64'); // Convert to Base64
    return base64;
});
exports.convertFileUrlToBase64 = convertFileUrlToBase64;
const encodeBase64 = (clientId, clientSecret) => {
    const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    return encoded;
};
exports.encodeBase64 = encodeBase64;
