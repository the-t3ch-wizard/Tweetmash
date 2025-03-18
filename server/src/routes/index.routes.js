"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../lib/utils");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const user_routes_1 = require("./user/user.routes");
const auth_routes_1 = require("./auth/auth.routes");
const router = (0, express_1.Router)();
router.get("/health-check", (0, utils_1.asyncHandler)((req, res) => {
    return res.status(200).json((0, utils_1.successResponse)(200, "Request successful", { message: "API is healthy!" }));
}));
router.use("/auth", auth_routes_1.authRoutes);
router.use((0, utils_1.asyncHandler)(auth_middleware_1.authMiddleware));
router.use("/user", user_routes_1.userRoutes);
exports.default = router;
