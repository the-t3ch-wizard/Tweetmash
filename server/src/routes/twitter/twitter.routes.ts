import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { twitter } from "../../controllers/twitter/twitter.controller";

export const twitterRoutes = Router();

twitterRoutes.get("/basic-details", asyncHandler(twitter.getBasicDetails))
