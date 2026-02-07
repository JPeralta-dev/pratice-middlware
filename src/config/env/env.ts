import z from "zod";

const envSchema = z.object({
  SECRET_KEY: z.string(),
  URL_REDIS: z.string(),
  PASSWORD_REDIS: z.string(),
});

export const env = envSchema.parse(process.env);

console.log(env);
