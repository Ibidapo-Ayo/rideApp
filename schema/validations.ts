import { z } from "zod";

export const registrationSchema = z.object({
  username: z.string({ message: "Username is required!" }).min(1, {
    message: "Username is required!",
  }),
  email: z.string({ message: "Email address is required!" }).email({
    message: "Invalid email address!",
  }),
  password: z.string({ message: "Password is required!" }).min(6, {
    message: "Password must not be lower than 6 characters",
  }),
});

export const loginSchema = registrationSchema.omit({ username: true });

export type registrationSchemaType = z.infer<typeof registrationSchema>;
export type loginSchemaType = z.infer<typeof loginSchema>
