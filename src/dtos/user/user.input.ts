import z from "zod";

export const LoginDto = z.object({
  username: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const RegisterDto = z.object({
  username: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export let schemaLogin: z.infer<typeof LoginDto>;
export let schemaRegister: z.infer<typeof RegisterDto>;
