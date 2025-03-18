import { z } from "zod";

export const accountsInfoSchema = z.object({
  profileName: z.string(),
});