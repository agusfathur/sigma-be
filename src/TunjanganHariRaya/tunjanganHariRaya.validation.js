import { object, string, number } from "zod";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";

export const THRCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  nominal: number().min(1, "Nominal is required"),
  tahun: number().min(1, "Tahun is required"),
  tanggal_pembayaran: string().min(1, "Date is required"),
  metode_pembayaran: string().min(1, "Keterangan is required")
});
export const THRUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  nominal: number().min(1, "Nominal is required"),
  tahun: number().min(1, "Tahun is required"),
  tanggal_pembayaran: string().min(1, "Date is required"),
  metode_pembayaran: string().min(1, "Keterangan is required")
}).partial();
