// id_absen         String   @id @default(cuid()) @db.VarChar(255)
// pegawai_id       String   @db.VarChar(255)
// tanggal_absen    DateTime @db.Date
// waktu_masuk      String?  @db.VarChar(255)
// koordinat_masuk  String?  @db.VarChar(255)
// waktu_pulang     String?  @db.VarChar(255)
// koordinat_pulang String?  @db.VarChar(255)
// foto_masuk       String?  @db.VarChar(255)
// foto_pulang      String?  @db.VarChar(255)
// status_absen     String   @db.VarChar(255)
// is_lembur        Boolean? @default(false)
// jadwal_id        String?  @db.VarChar(255)

import { object, string } from "zod";

export const AbsensiCreateSchema = object({
  pegawai_id: string().min(1, "pegawai id is required"),
  tanggal_absen: string().min(1, "date is required"),
  waktu_masuk: string().min(1, "waktu masuk is required"),
  koordinat_masuk: string().min(1, "koordinat masuk is required"),
  waktu_pulang: string().min(1, "waktu pulang is required"),
  koordinat_pulang: string().min(1, "koordinat pulang is required"),
  foto_masuk: string().min(1, "fotomasuk is required"),
  foto_pulang: string().min(1, "fotopulang is required"),
  status_absen: string().min(1, "status absen is required"),
  is_lembur: string().min(1, "is lembur is required"),
  jadwal_id: string().min(1, "jadwal id is required")
});

export const AbsensiUpdateSchema = AbsensiCreateSchema.partial();

export const AbsensiBerangkatSchema = object({
  pegawai_id: string().min(1, "pegawai id is required"),
  waktu_masuk: string().min(1, "waktu masuk is required"),
  koordinat_masuk: string().min(1, "koordinat masuk is required"),
  foto_masuk: string().min(1, "fotomasuk is required"),
  jadwal_id: string().min(1, "jadwal id is required")
});

export const AbsensiPulangSchema = object({
  pegawai_id: string().min(1, "pegawai id is required"),
  waktu_pulang: string().min(1, "waktu pulang is required"),
  koordinat_pulang: string().min(1, "koordinat pulang is required"),
  foto_pulang: string().min(1, "fotopulang is required"),
  jadwal_id: string().min(1, "jadwal id is required")
});
