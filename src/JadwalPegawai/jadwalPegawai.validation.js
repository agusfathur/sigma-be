//    pegawai_id String   @db.VarChar(255)
//     shift_id   String   @db.VarChar(255)
//     tanggal    DateTime @db.Date

import { object, string } from "zod";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";
import { getShiftKerjaById } from "../ShiftKerja/shiftKerja.repository.js";

export const JadwalPegawaiCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  shift_id: string().min(1, "Shift is required"),
  tanggal: string().min(1, "Date is required")
})
  .refine(
    async (data) => {
      const pegawai = await getPegawaiById(data.pegawai_id);
      return pegawai;
    },
    {
      message: "Pegawai doesn't exists",
      path: ["pegawai_id"]
    }
  )
  .refine(
    async (data) => {
      const shift = await getShiftKerjaById(data.shift_id);
      return shift;
    },
    {
      message: "Shift doesn't exists",
      path: ["shift_id"]
    }
  );

export const JadwalPegawaiUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  shift_id: string().min(1, "Shift is required"),
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
      message: "Pegawai doesn't exists",
      path: ["pegawai_id"]
    }
  )
  .refine(
    async (data) => {
      if (!data.shift_id) return true;
      const shift = await getShiftKerjaById(data.shift_id);
      return shift;
    },
    {
      message: "Shift doesn't exists",
      path: ["shift_id"]
    }
  );
