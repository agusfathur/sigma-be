import { object, string, enum as enum_ } from "zod";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";
import { getJenisIzinById } from "../JenisIzin/jenisIzin.repository.js";

export const PermohonanIzinCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  jenis_mohon_izin: string().min(1, "Jenis Izin is required").max(100, "Jenis Izin is too long"),
  jenis_izin_id: string().min(1, "Jenis Izin is required"),
  bukti: string().min(1, "Bukti is required"),
  tanggal_dari: string().min(1, "Date is required"),
  tanggal_sampai: string().min(1, "Date is required"),
  keterangan: string().min(1, "Keterangan is required"),
  status: string().min(1, "Status is required")
})
  .refine(
    async (data) => {
      const pegawai = await getPegawaiById(data.pegawai_id);
      return pegawai;
    },
    {
      message: "Pegawai not found",
      path: ["pegawai_id"]
    }
  )
  .refine(
    (data) => {
      const val = ["izin", "cuti"];
      return val.includes(data.jenis_mohon_izin);
    },
    {
      message: "Jenis Izin must be izin or cuti",
      path: ["jenis_mohon_izin"]
    }
  )
  .refine(
    async (data) => {
      const jenisIzinId = await getJenisIzinById(data.jenis_izin_id);
      return jenisIzinId;
    },
    {
      message: "Jenis Izin not found",
      path: ["jenis_izin_id"]
    }
  )
  .refine(
    (data) => {
      const formatBukti = ["pdf", "jpg", "jpeg", "png", "PDF", "JPG", "JPEG", "PNG"];
      const ambilFormatBukti = data.bukti.split(".")[1];

      return formatBukti.includes(ambilFormatBukti);
    },
    {
      message: "Format bukti harus pdf, jpg, jpeg, png",
      path: ["bukti"]
    }
  );

export const PermohonanIzinUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  jenis_mohon_izin: string().min(1, "Jenis Izin is required"),
  jenis_izin_id: string().min(1, "Jenis Izin is required"),
  bukti: string().min(1, "Bukti is required"),
  tanggal_dari: string().min(1, "Date is required"),
  tanggal_sampai: string().min(1, "Date is required"),
  keterangan: string().min(1, "Keterangan is required"),
  status: string().min(1, "Status is required")
})
  .partial()
  .refine(async (data) => {
    if (!data.pegawai_id) return true;
    const pegawai = await getPegawaiById(data.pegawai_id);
    return pegawai;
  })
  .refine(
    (data) => {
      if (!data.jenis_mohon_izin) return true;
      const val = ["izin", "cuti"];
      return val.includes(data.jenis_mohon_izin);
    },
    {
      message: "Jenis Izin must be izin or cuti",
      path: ["jenis_mohon_izin"]
    }
  )
  .refine(
    async (data) => {
      if (!data.jenis_izin_id) return true;
      const jenisIzinId = await getJenisIzinById(data.jenis_izin_id);
      return jenisIzinId;
    },
    {
      message: "Jenis Izin not found",
      path: ["jenis_izin_id"]
    }
  )
  .refine(
    (data) => {
      if (!data.bukti) return true;
      const formatBukti = ["pdf", "jpg", "jpeg", "png", "PDF", "JPG", "JPEG", "PNG"];
      const ambilFormatBukti = data.bukti.split(".")[1];

      return formatBukti.includes(ambilFormatBukti);
    },
    {
      message: "Format bukti harus pdf, jpg, jpeg, png",
      path: ["bukti"]
    }
  );
