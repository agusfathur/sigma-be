import { object, string } from "zod";

export const LoginSchema = object({
  username: string().min("Email is required"),
  password: string().min("Password is required")
});
