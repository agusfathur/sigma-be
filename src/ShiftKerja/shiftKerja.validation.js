import { object, string, number } from "zod";

export const ShiftKerjaCreateSchema = object({
  shift_kerja: string().min(1, "Shift kerja is required"),
  waktu_masuk: string().min(1, "Waktu Masuk is required"),
  waktu_pulang: string().min(1, "Waktu Pulang is required"),
  durasi_kerja: number().min(1, "Durasi Kerja is required"),
  keterangan: string().min(1, "Keterangan is required")
});

export const ShiftKerjaUpdateSchema = object({
  shift_kerja: string().min(1, "Shift kerja is required"),
  waktu_masuk: string().min(1, "Waktu Masuk is required"),
  waktu_pulang: string().min(1, "Waktu Pulang is required"),
  durasi_kerja: number().min(1, "Durasi Kerja is required"),
  keterangan: string().min(1, "Keterangan is required")
}).partial();
