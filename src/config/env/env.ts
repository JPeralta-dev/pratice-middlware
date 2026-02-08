import dotenv from "dotenv";
import z from "zod";

dotenv.config();

const envSchema = z.object({
  SECRET_KEY: z.string(),
  URL_REDIS: z.string(),
  PASSWORD_REDIS: z.string(),
});

let env: z.infer<typeof envSchema>;

/**
 * Esto es typeScripts un poco duro pero explico para acordarme y enteder mejor
 * como el parse() cuando da error explota, necesito envolverlo en un try para copntrolarlo,
 * ahora, lo que le indicamos es con el z.infer, es mira a la variable envSchema y saca los tipos exactos,
 * el ya entiende que env es ahora de tipo loq ue corresponde envSchema y
 */
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
