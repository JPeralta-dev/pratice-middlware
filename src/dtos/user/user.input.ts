import z from "zod";

export const LoginDto = z.object({
  username: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const RegisterDto = z.object({
  username: z.email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
