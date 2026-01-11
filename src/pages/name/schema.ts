import { z } from "zod";

export const nameSchema = z.object({
  fullName: z.string().trim().min(2, "Enter a full name that is at least 2 characters long")
});

export type NameForm = z.infer<typeof nameSchema>;
