import { object, string } from "zod";
import { getLiburById } from "./libur.repository.js";

export const LiburCreateSchema = object({
  kategori_libur_id: string().min(1, "Kategori Libur is required"),
  nama: string().min(1, "Libur is required").max(100, "Libur is too long"),
  tanggal: string().min(1, "Libur is required"),
  status_absen: string().min(1, "Status is required")
}).refine(
  async (data) => {
    const libur = await getLiburById(data.kategori_libur_id);
    return !libur;
  },
  {
    message: "Libur doesn't exists",
    path: ["kategori_libur_id"]
  }
);

export const LiburUpdateSchema = object({
  kategori_libur_id: string().min(1, "Kategori Libur is required"),
  nama: string().min(1, "Libur is required").max(100, "Libur is too long"),
  tanggal: string().min(1, "Libur is required"),
  status_absen: string().min(1, "Status is required")
})
  .partial()
  .refine(
    async (data) => {
      if (!data.kategori_libur_id) return true;
      const libur = await getLiburById(data.kategori_libur_id);
      return !libur;
    },
    {
      message: "Libur doesn't exists",
      path: ["kategori_libur_id"]
    }
  );
