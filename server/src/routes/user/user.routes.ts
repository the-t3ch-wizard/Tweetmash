import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { user } from "../../controllers/user/user.controller";

export const userRoutes = Router();

userRoutes.get("/remaining-tweets", asyncHandler(user.getRemainingTweets))
