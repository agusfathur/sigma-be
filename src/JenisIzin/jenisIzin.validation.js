import { number, object, string } from "zod";

export const JenisIzinCreateSchema = object({
  nama: string().min(1, "Jenis izin is required").max(100, "Jenis izin is too long"),
  jenis: string().min(1, "Jenis izin is required").max(100, "Jenis izin is too long"),
  jatah: number().min(0, "Jatah izin is required"),
  tahun: number().min(1, "Tahun izin is required")
});

export const JenisIzinUpdateSchema = object({
  nama: string().min(1, "Jenis izin is required").max(100, "Jenis izin is too long"),
  jenis: string().min(1, "Jenis izin is required").max(100, "Jenis izin is too long"),
  jatah: number().min(0, "Jatah izin is required"),
  tahun: number().min(1, "Tahun izin is required")
}).partial();
