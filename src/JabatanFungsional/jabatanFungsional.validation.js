import { number, object, string } from "zod";

export const JabatanFungsionalCreateSchema = object({
  nama: string().min(1, "Jabatan Fungsional is required").max(100, "Jabatan Fungsional is too long"),
  tunjangan: number().min(1, "Gaji is required")
});

export const JabatanFungsionalUpdateSchema = object({
  nama: string().min(1, "Jabatan Fungsional is required").max(100, "Jabatan Fungsional is too long"),
  tunjangan: number().min(1, "Gaji is required")
}).partial();
