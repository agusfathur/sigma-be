import { object, string, number, array, ZodError } from "zod";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";
import { getTunjanganTetapById } from "../TunjanganTetap/tunjanganTetap.repository.js";

export const TunjanganTetapPegawaiOneCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  tunjangan_tetap_id: string().min(1, "Tunjangan tetap is required"),
  jumlah: number().min(1, "Tunjangan tetap is required")
})
  .refine(
    async (data) => {
      const pegawai = await getPegawaiById(data.pegawai_id);
      return pegawai;
    },
    {
      message: "Pegawai is not found",
      path: ["pegawai_id"]
    }
  )
  .refine(
    async (data) => {
      const tunjanganTetap = await getTunjanganTetapById(data.tunjangan_tetap_id);
      return tunjanganTetap;
    },
    {
      message: "Tunjangan tetap is not found",
      path: ["tunjangan_tetap_id"]
    }
  );

export const TunjanganTetapPegawaiOneUpdateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  tunjangan_tetap_id: string().min(1, "Tunjangan tetap is required"),
  jumlah: number().min(1, "Tunjangan tetap is required")
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
  )
  .refine(
    async (data) => {
      if (!data.tunjangan_tetap_id) return true;
      const tunjanganTetap = await getTunjanganTetapById(data.tunjangan_tetap_id);
      return tunjanganTetap;
    },
    {
      message: "Tunjangan tetap is not found",
      path: ["tunjangan_tetap_id"]
    }
  );

const TunjanganTetapPegawaiCreateSchema = object({
  pegawai_id: string().min(1, "Pegawai is required"),
  tunjangan_tetap_id: string().min(1, "Tunjangan tetap is required"),
  jumlah: number().min(1, "Jumlah tunjangan tetap is required")
});
// Skema untuk update, menggunakan partial agar semua field opsional
const TunjanganTetapPegawaiUpdateSchema = object({
  id_tunjangan_tetap_pegawai: string().nullable(),
  pegawai_id: string().min(1, "Pegawai is required"),
  tunjangan_tetap_id: string().min(1, "Tunjangan tetap is required"),
  jumlah: number().min(1, "Jumlah tunjangan tetap is required")
}).partial();

// Skema utama untuk validasi array data saat create
export const TunjanganTetapPegawaiCreateManySchema = array(TunjanganTetapPegawaiCreateSchema)
  .nonempty("Data tidak boleh kosong")
  .refine(
    async (data) => {
      // Validasi untuk memastikan pegawai_id yang diberikan valid
      for (const item of data) {
        const pegawai = await getPegawaiById(item.pegawai_id);
        if (!pegawai) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Salah satu Pegawai tidak ditemukan",
      path: ["pegawai_id"]
    }
  )
  .refine(
    async (data) => {
      // Validasi untuk memastikan tunjangan_tetap_id yang diberikan valid
      for (const item of data) {
        const tunjanganTetap = await getTunjanganTetapById(item.tunjangan_tetap_id);
        if (!tunjanganTetap) {
          return false;
        }
      }
      return true;
    },
    {
      message: "Salah satu Tunjangan tetap tidak ditemukan",
      path: ["tunjangan_tetap_id"]
    }
  );

// Skema utama untuk validasi array data saat update
export const TunjanganTetapPegawaiUpdateManySchema = array(TunjanganTetapPegawaiUpdateSchema)
  .nonempty("Data can't be empty")
  .refine(
    async (data) => {
      // Validasi untuk memastikan pegawai_id yang diberikan valid (jika ada)\
      for (const item of data) {
        if (!item.pegawai_id) return true;
        if (item.pegawai_id) {
          const pegawai = await getPegawaiById(item.pegawai_id);
          if (!pegawai) {
            return false;
          }
        }
      }
      return true;
    },
    {
      message: "One of pegawai is not found",
      path: ["pegawai_id"]
    }
  )
  .refine(
    async (data) => {
      // Validasi untuk memastikan tunjangan_tetap_id yang diberikan valid (jika ada)
      for (const item of data) {
        if (!item.tunjangan_tetap_id) return true;
        if (item.tunjangan_tetap_id) {
          const tunjanganTetap = await getTunjanganTetapById(item.tunjangan_tetap_id);
          if (!tunjanganTetap) {
            return false;
          }
        }
      }
      return true;
    },
    {
      message: "One of tunjangan tetap is not found",
      path: ["tunjangan_tetap_id"]
    }
  );
