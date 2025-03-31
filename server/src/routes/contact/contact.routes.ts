import { Router } from "express";
import { asyncHandler } from "../../lib/utils";
import { contact } from "../../controllers/contact/contact.controller";

export const contactRoutes = Router();

contactRoutes.post("/", asyncHandler(contact.mail))
