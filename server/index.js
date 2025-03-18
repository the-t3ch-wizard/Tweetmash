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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const utils_1 = require("./src/lib/utils");
const logger_middleware_1 = require("./src/middlewares/logger.middleware");
const index_routes_1 = __importDefault(require("./src/routes/index.routes"));
const database_1 = __importDefault(require("./src/config/database"));
const env_1 = require("./src/config/env");
const swaggerDocument = require('./src/docs/swagger-output.json');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        env_1.env.FRONTEND_URL,
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// middleware
app.use(logger_middleware_1.loggerMiddleware);
// api to test server status
app.get('/', (0, utils_1.asyncHandler)((req, res) => {
    return res.status(200).json((0, utils_1.successResponse)(200, "Req successful", { message: "Server is running fine" }));
}));
// all routes
app.use("/api/v1/", index_routes_1.default);
// Serve Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use((req, res, next) => {
    res.status(404).json((0, utils_1.errorResponse)(404, "Route Not Found"));
});
// error handler middleware
app.use(utils_1.errorHandler);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.default)();
        app.listen(env_1.env.PORT || 7000, () => {
            console.log('The server is running locally on port 7000: http://localhost:7000');
        });
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
});
startServer();
