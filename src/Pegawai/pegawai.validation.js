import { object, string, number, array } from "zod";
import {
  getPegawaiByEmail,
  getPegawaiByNIK,
  getPegawaiByNIP,
  getPegawaiByNomorHP,
  getPegawaiByNoRek
} from "./pegawai.repository.js";

export const PegawaiCreateSchema = object({
  nama: string().min(1, "Name is required").max(255, "Name is too long"),
  email: string().min(1, "Email is required").email("Email is invalid"),
  nomor_hp: string().min(1, "Phone number is required").max(255, "Phone number is too long"),
  foto: string().min(1, "Photo is required"),
  nik: string().min(16, "NIK is required").max(16, "NIK is too long, max 16 characters"),
  nip: string().max(16, "NIP is too long"),
  tempat_lahir: string().min(1, "Place of birth is required").max(200, "Place of birth is too long"),
  tanggal_lahir: string().min(1, "Date of birth is required"),
  tanggal_masuk: string().min(1, "Date of joining is required"),
  tanggal_pensiun: string().min(1, "Date of resignation is required"),
  gender: string().min(1, "Gender is required").max(100, "Gender is too long"),
  agama: string().min(1, "Religion is required").max(100, "Religion is too long"),
  alamat: string().min(1, "Address is required").max(255, "Address is too long"),
  tenaga: string().min(1, "Role is required").max(100, "Role is too long"),
  status_tetap: string().min(1, "Status is required").max(100, "Status is too long"),
  jabatan_id: string().min(1, "Position is required"),
  status_kepegawaian_id: string().min(1, "Status Kepegawaian is required"),
  riwayat_pendidikan: array(string()).min(1, "Education history is required"),
  status_pernikahan: string().min(1, "Marital status is required").max(100, "Marital status is too long"),
  jumlah_istri: number().min(0, "Number of brothers is required"),
  jumlah_anak: number().min(0, "Number of children is required"),
  nomor_rekening: string().optional(),
  status_pegawai: string().min(1, "Status is required").max(100, "Status is too long"),
  lokasi_id: string().min(1, "Location is required"),
  jabatan_fungsional_id: array(string()).optional()
})
  .refine(
    async (data) => {
      const checkEmail = await getPegawaiByEmail(data.email);
      if (checkEmail) return false;
      return true;
    },
    {
      message: "Email already exists",
      path: ["email"]
    }
  )
  .refine(
    async (data) => {
      const nomorHP = await getPegawaiByNomorHP(data.nomor_hp);
      if (nomorHP) return false;
      return true;
    },
    {
      message: "Nomor HP already exists",
      path: ["nomor_hp"]
    }
  )
  .refine(
    async (data) => {
      const checkNik = await getPegawaiByNIK(data.nik);
      if (checkNik) return false;
      return true;
    },
    {
      message: "NIK already exists",
      path: ["nik"]
    }
  )
  .refine(
    async (data) => {
      if (!data.nip) return true;
      const checkNIP = await getPegawaiByNIP(data.nip);
      if (checkNIP) return false;
      return true;
    },
    {
      message: "NIP already exists",
      path: ["nip"]
    }
  )
  .refine(
    async (data) => {
      if (!data.nomor_rekening) return true;
      const checkNoRek = await getPegawaiByNoRek(data.nomor_rekening);
      if (checkNoRek) return false;
      return true;
    },
    {
      message: "Nomor Rekening already exists",
      path: ["nomor_rekening"]
    }
  );

export const PegawaiUpdateSchema = object({
  pegawaiId: string(),
  nama: string().min(1, "Name is required").max(255, "Name is too long"),
  email: string().min(1, "Email is required").email("Email is invalid"),
  nomor_hp: string().min(1, "Phone number is required").max(255, "Phone number is too long"),
  foto: string().min(1, "Photo is required"),
  nik: string().min(16, "NIK is required").max(16, "NIK is too long"),
  nip: string().max(18, "NIP is too long"),
  tempat_lahir: string().min(1, "Place of birth is required").max(200, "Place of birth is too long"),
  tanggal_lahir: string().min(1, "Date of birth is required"),
  tanggal_pensiun: string().min(1, "Date of resignation is required"),
  gender: string().min(1, "Gender is required").max(100, "Gender is too long"),
  agama: string().min(1, "Religion is required").max(100, "Religion is too long"),
  alamat: string().min(1, "Address is required").max(255, "Address is too long"),
  tenaga: string().min(1, "Role is required").max(100, "Role is too long"),
  status_tetap: string().min(1, "Status is required").max(100, "Status is too long"),
  jabatan_id: string().min(1, "Position is required"),
  status_kepegawaian_id: string().min(1, "Status Kepegawaian is required"),
  riwayat_pendidikan: array(string()).min(1, "Riwatyat pendidikan is required"),
  status_pernikahan: string().min(1, "Marital status is required").max(100, "Marital status is too long"),
  jumlah_istri: number().min(0, "Number of brothers is required"),
  jumlah_anak: number().min(0, "Number of children is required"),
  nomor_rekening: string().optional(),
  status_pegawai: string().min(1, "Status is required").max(100, "Status is too long"),
  lokasi_id: string().min(1, "Location is required"),
  status_kepegawaian_id: string().min(1, "Status Kepegawaian is required"),
  jabatan_fungsional_id: array(string()).optional()
})
  .partial()
  .refine(
    async (data) => {
      if (!data.email) return true;
      const checkEmail = await getPegawaiByEmail(data.email);
      if (checkEmail && checkEmail.id_pegawai !== data.pegawaiId) return false;
      return true;
    },
    {
      message: "Email already exists",
      path: ["email"]
    }
  )
  .refine(
    async (data) => {
      if (!data.nomor_hp) return true;
      const nomorHP = await getPegawaiByNomorHP(data.nomor_hp);
      if (nomorHP && nomorHP.id_pegawai !== data.pegawaiId) return false;
      return true;
    },
    {
      message: "Nomor HP already exists",
      path: ["nomor_hp"]
    }
  )
  .refine(
    async (data) => {
      if (!data.nik) return true;
      const checkNik = await getPegawaiByNIK(data.nik);
      if (checkNik && checkNik.id_pegawai !== data.pegawaiId) return false;
      return true;
    },
    {
      message: "NIK already exists",
      path: ["nik"]
    }
  )
  .refine(
    async (data) => {
      if (!data.nip) return true;
      const checkNIP = await getPegawaiByNIP(data.nip);
      if (checkNIP && checkNIP.id_pegawai !== data.pegawaiId) return false;
      return true;
    },
    {
      message: "NIP already exists",
      path: ["nip"]
    }
  )
  .refine(
    async (data) => {
      if (!data.nomor_rekening) return true;
      const checkNoRek = await getPegawaiByNoRek(data.nomor_rekening);
      if (checkNoRek && checkNoRek.id_pegawai !== data.pegawaiId) return false;
      return true;
    },
    {
      message: "Nomor Rekening already exists",
      path: ["nomor_rekening"]
    }
  );
