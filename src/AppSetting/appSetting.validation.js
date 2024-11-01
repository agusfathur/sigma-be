//@ts-nocheck
import { object, string } from "zod";

export const AppSettingUpdateSchema = object({
  nama_sistem: string().min(1, "System Name is required").max(100, "System Name is too long"),
  singkatan_sistem: string().min(1, "System Name is required").max(100, "System Name is too long"),
  logo: string().min(1, "Logo is required"),
  deskripsi: string().min(1, "Description is required").max(1000, "Description is too long"),
  developer: string().min(1, "Developer is required").max(100, "Developer is too long"),
  author: string().min(1, "Author is required").max(100, "Author is too long")
}).partial();
