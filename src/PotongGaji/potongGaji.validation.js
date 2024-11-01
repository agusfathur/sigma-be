import { object, string, number } from "zod";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";

export const PotongGajiCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  nominal: number().min(1, "Nominal is required"),
  tanggal: string().min(1, "Date is required"),
  tahun: number().min(1, "Tahun is required"),
  keterangan: string().min(1, "Keterangan is required")
}).refine(async (data) => {
  const pegawai = await getPegawaiById(data.pegawai_id);
  return pegawai;
});
export const PotongGajiUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  nominal: number().min(1, "Nominal is required"),
  tanggal: string().min(1, "Date is required"),
  tahun: number().min(1, "Tahun is required"),
  keterangan: string().min(1, "Keterangan is required")
})
  .partial()
  .refine(async (data) => {
    if (!data.pegawai_id) return true;
    const pegawai = await getPegawaiById(data.pegawai_id);
    return pegawai;
  });
