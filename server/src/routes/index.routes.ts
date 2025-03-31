import { Router } from "express";
import { asyncHandler, successResponse } from "../lib/utils";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userRoutes } from "./user/user.routes";
import { authRoutes } from "./auth/auth.routes";
import { twitterRoutes } from "./twitter/twitter.routes";
import { contactRoutes } from "./contact/contact.routes";

const router = Router();

router.get("/health-check", asyncHandler((req: any, res: any) => {
  return res.status(200).json(successResponse(200, "Request successful", { message: "API is healthy!" }))
}))

router.use("/auth", authRoutes)

router.use(asyncHandler(authMiddleware));

router.use("/twitter", twitterRoutes)

router.use("/user", userRoutes)

router.use("/contact", contactRoutes)

export default router;
