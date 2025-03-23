import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { user } from "../../controllers/user/user.controller";
import { twitter } from "../../controllers/twitter/twitter.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";


export const authRoutes = Router();

authRoutes.post("/login", asyncHandler(user.login))
authRoutes.post("/signup", asyncHandler(user.signup))
authRoutes.post("/logout", asyncHandler(user.logout))
authRoutes.get("/who-am-i", asyncHandler(user.whoAmI))

authRoutes.use(asyncHandler(authMiddleware));

authRoutes.post("/twitter", asyncHandler(twitter.authorize))
authRoutes.post("/init/twitter", asyncHandler(twitter.initializeAuthorization))
authRoutes.post("/connect/twitter", asyncHandler(twitter.getAccessToken))
authRoutes.put("/disconnect/twitter", asyncHandler(twitter.invalidateToken))
