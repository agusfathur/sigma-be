import { object, string, boolean } from "zod";

export const SettingGajiCreateSchema = object({
  gaji_pokok: boolean().optional(),
  tunjangan_tetap: boolean().optional(),
  tunjangan_fungsional: boolean().optional(),
  tunjangan_bonus: boolean().optional(),
  tunjangan_lembur: boolean().optional(),
  pinjaman: boolean().optional(),
  potong_gaji: boolean().optional(),
  tunjangan_kehadiran_id: string().optional(),
  pajak_id: string().array().optional()
});

export const SettingGajiUpdateSchema = SettingGajiCreateSchema.partial();
