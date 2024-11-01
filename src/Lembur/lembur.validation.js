import { number, object, string } from "zod";

export const LemburCreateSchema = object({
  absensi_id: string().min(1, "Pegawai is required"),
  junlah_upah: number().min(1, "jumlah upah is required"),
  total_upah: number().min(1, "Total upah is required"),
  total_jam: number().min(1, "Total jam is required"),
  rincian: string().min(1, "Rincian is required")
});

export const LemburUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  junlah_upah: number().min(1, "Jumlah Upah is required"),
  total_upah: number().min(1, "Total Upah is required"),
  total_jam: number().min(1, "Total Jam is required"),
  rincian: string().min(1, "Rincian is required")
}).partial();
