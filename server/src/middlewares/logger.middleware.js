"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_1 = require("../lib/logger");
const loggerMiddleware = (req, res, next) => {
    logger_1.logger.info(`REQUEST: ${req.method} ${req.url}`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
