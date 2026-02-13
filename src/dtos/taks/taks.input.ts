import { z } from "zod";

export const RegisterTaksDto = z.object({
  title: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "The 'title' field is required"
          : "The 'title' field must be a string ",
    })
    .min(1, "The 'title' field cannot be empty"),
  description: z.string("The 'description' field is required"),
  dueDate: z.string("The 'dueDate' field is required"),
  status: z.boolean("The 'status' field is required"),
  createBy: z.string("The 'createBy' field is required"),
  assignedTo: z.number("The 'assignedTo' field is required"),
  id: z
    .string({
      error: (iss) =>
        iss.input === undefined
          ? "The 'id' field is required"
          : "The 'title' field must be a string ",
    })
    .min(1, "The 'id' field cannot be empty"),
});
