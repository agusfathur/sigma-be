// @ts-nocheck
import { object, string } from "zod";
import { findUserByUsername, findUserByEmail, findUserById } from "./user.repository.js";

const findUsername = async (username) => {
  return await findUserByUsername(username);
};

const findEmail = async (email) => {
  return await findUserByEmail(email);
};

export const UserCreateSchema = object({
  nama: string().min(1, "Name is required").max(200, "Name is too long"),
  username: string().min(1, "Username is required").max(20, "Username is too long"),
  password: string().min(8, "Password minimum 8 characters").max(20, "Password is too long"),
  email: string().min(1, "Email is required").email("Email is invalid"),
  role: string().min(1, "Role is required")
})
  .refine(
    async (data) => {
      const user = await findUserByUsername(data.username);
      // true = validasi sukses / dilewati
      // false = validasi gagal / muncul error
      return !user;
    },
    {
      message: "Username already exists",
      path: ["username"]
    }
  )
  .refine(
    async (data) => {
      const user = await findUserByEmail(data.email);
      return !user;
    },
    {
      message: "Email already exists",
      path: ["email"]
    }
  );

export const UserUpdateSchema = object({
  userId: string(),
  username: string().min(1, "Username is required").max(20, "Username is too long"),
  password: string().min(8, "Password minimum 8 characters").max(20, "Password is too long"),
  nama: string().min(1, "Name is required").max(200, "Name is too long"),
  email: string().min(1, "Email is required").email("Email is invalid"),
  role: string().min(1, "Role is required")
})
  .partial()
  .refine(
    async (data) => {
      if (!data.username) return true;

      const username = await findUsername(data.username);
      if (username && username.id_user !== data.userId) return false;
      return true;
    },
    {
      message: "Username already exists",
      path: ["username"]
    }
  )
  .refine(
    async (data) => {
      if (!data.email) return true;
      const email = await findEmail(data.email);
      if (email && email.id_user !== data.userId) return false;
      return true;
    },
    {
      message: "Email already exists",
      path: ["email"]
    }
  );
