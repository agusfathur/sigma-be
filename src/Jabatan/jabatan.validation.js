import { object, string, number } from "zod";

export const JabatanCreateSchema = object({
  nama: string().min(1, "Jabatan is required").max(100, "Jabatan is too long"),
  gaji: number().min(1, "Gaji is required")
});

export const JabatanUpdateSchema = object({
  nama: string().min(1, "Jabatan is required").max(100, "Jabatan is too long"),
  gaji: number().min(1, "Gaji is required")
}).partial();
