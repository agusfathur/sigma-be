import { object, string } from "zod";

export const KategoriLiburCreateSchema = object({
  jenis: string().min(1, "Kategori Libur is required").max(100, "Kategori Libur is too long")
});

export const KategoriLiburUpdateSchema = object({
  jenis: string().min(1, "Kategori Libur is required").max(100, "Kategori Libur is too long")
}).partial();
