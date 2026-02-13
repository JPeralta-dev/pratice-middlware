import z, { email } from "zod";
/**
 * Leyendo documencaion puedo saber como incluiir alguinos correos
 * institucionales para que solo puedan acceder esos dominios y en
 * este ejemplo vamos a llevar solo el de la univerdidad popular del
 * dcesar teniendo en cuenta que ellos serua capaces de entrar
 */

const ALLOWED_DOMAINS = ["@unicesar.edu.co", "@empresaX.com", "@gmail.com"];

export const LoginDto = z.object({
  username: z
    .email("Invalid email format")
    .refine((email) =>
      ALLOWED_DOMAINS.some((b) => email.toLocaleLowerCase().endsWith(b)),
    ),
  password: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "The 'password' field is required"
          : "The 'password' field must be a string ",
    })
    .min(8, "Password must be at least 8 characters"),
});

export const RegisterDto = z.object({
  username: z
    .email("Invalid email format")
    .refine((email) =>
      ALLOWED_DOMAINS.some((b) => email.toLocaleLowerCase().endsWith(b)),
    ),
  password: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "The 'password' field is required"
          : "The 'password' field must be a string ",
    })
    .min(8, "Password must be at least 8 characters"),
});

export let schemaLogin: z.infer<typeof LoginDto>;
export let schemaRegister: z.infer<typeof RegisterDto>;
