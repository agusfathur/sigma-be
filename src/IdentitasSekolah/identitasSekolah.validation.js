import { object, string } from "zod";

export const identitasSekolahSchema = object({
  nama_sekolah: string().min(1, "Name is required").max(200, "Name is too long"),
  kementrian: string().min(1, "Kementrian is required").max(100, "Kementrian is too long"),
  nsm: string().min(1, "NSM is required").max(50, "NSM is too long"),
  npsn: string().min(1, "NPSN is required").max(50, "NPSN is too long"),
  status: string().min(1, "Status is required").max(30, "Status is too long"),
  akreditasi: string().min(1, "Akreditasi is required").max(20, "Akreditasi is too long"),
  kota: string().min(1, "Kota is required").max(255, "Kota is too long"),
  tanggal_berdiri: string().min(1, "Tgl. Berdiri is required"),
  provinsi: string().min(1, "Provinsi is required").max(255, "Provinsi is too long"),
  email: string().min(1, "Email is required").email("Email is invalid"),
  no_telp: string().min(1, "No. Telp. is required").max(255, "No. Telp. is too long"),
  kode_pos: string().min(1, "Kode Pos is required").max(5, "Kode Pos is too long"),
  fax: string().max(255, "Fax is too long"),
  website: string().min(1, "Website is required").max(255, "Website is too long"),
  alamat: string().min(1, "Address is required").max(255, "Address is too long"),
  kepala_sekolah: string().min(1, "Headmaster is required").max(255, "Headmaster is too long")
}).partial();
