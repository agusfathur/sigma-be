// nama        String @db.VarChar(255)
// kode        String @db.VarChar(255)
// alamat      String @db.VarChar(255)
// koordinat   String @db.VarChar(255)
// luas_lokasi Int    @db.Integer
import { object, string, number } from "zod";

export const DataLokasiCreateSchema = object({
  nama: string().min(1, "Name is required").max(255, "Name is too long"),
  alamat: string().min(1, "Address is required").max(255, "Address is too long"),
  koordinat: string().min(1, "Coordinate is required").max(255, "Coordinate is too long"),
  luas_lokasi: number().min(1, "Area is required")
});

export const DataLokasiUpdateSchema = object({
  nama: string().min(1, "Name is required").max(255, "Name is too long"),
  alamat: string().min(1, "Address is required").max(255, "Address is too long"),
  koordinat: string().min(1, "Coordinate is required").max(255, "Coordinate is too long"),
  luas_lokasi: number().min(1, "Area is required")
}).partial();
