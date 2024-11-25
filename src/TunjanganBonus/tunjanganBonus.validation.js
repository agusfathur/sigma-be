import { number, object, string } from "zod";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";
export const TunjanganBonusCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  nominal: number().min(1, "Nominal is required"),
  keterangan: string().min(1, "Keterangan is required"),
  tanggal: string().min(1, "Date is required")
}).refine(
  async (data) => {
    const pegawai = await getPegawaiById(data.pegawai_id);
    return pegawai;
  },
  {
    message: "Pegawai is not found",
    path: ["pegawai_id"]
  }
);
export const TunjanganBonusUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  nominal: number().min(1, "Nominal is required"),
  keterangan: string().min(1, "Keterangan is required"),
  tanggal: string().min(1, "Date is required")
})
  .partial()
  .refine(
    async (data) => {
      if (!data.pegawai_id) return true;
      const pegawai = await getPegawaiById(data.pegawai_id);
      return pegawai;
    },
    {
      message: "Pegawai is not found",
      path: ["pegawai_id"]
    }
  );
