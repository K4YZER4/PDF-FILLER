import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(3000),
  FRONTEND_URL: z.string().url(),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),
});

export const config = envSchema.parse(process.env);
