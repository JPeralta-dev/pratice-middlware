import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  SECRET_KEY: z.string(),
  URL_REDIS: z.string(),
  PASSWORD_REDIS: z.string(),
});

let env: z.infer<typeof envSchema>;

try {
  env = envSchema.parse(process.env);
  console.log("Se cargaron correctamente");
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Se produjo un error al cargar las envs", Date().toString());
    console.error(error);
  }
  process.exit(1);
}
//

export { env };
