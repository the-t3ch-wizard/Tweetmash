import { Router } from "express";
import { asyncHandler, successResponse } from "../lib/utils";
import { user } from "../controllers/user/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userRoutes } from "./user/user.routes";
import { authRoutes } from "./auth/auth.routes";

const router = Router();

router.get("/health-check", asyncHandler((req: any, res: any) => {
  return res.status(200).json(successResponse(200, "Request successful", { message: "API is healthy!" }))
}))

router.use("/auth", authRoutes)

router.use(asyncHandler(authMiddleware));

router.use("/user", userRoutes)

export default router;
