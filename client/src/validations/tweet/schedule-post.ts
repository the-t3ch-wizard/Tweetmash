import { z } from "zod";

export const schedulePostSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  scheduledTime: z.date({
    required_error: "Please select a date and time",
  }),
  includeHashtags: z.boolean().default(false),
  recurrence: z.enum(["none", "daily", "weekly"]).default("none"),
  tone: z.string().min(1, "Tone is required"),
});

export type schedulePostValues = z.infer<typeof schedulePostSchema>;
