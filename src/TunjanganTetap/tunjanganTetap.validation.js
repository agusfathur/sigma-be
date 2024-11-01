import { object, string, number } from "zod";

export const TunjanganTetapCreateSchema = object({
  nama: string().min(1, "Tunjangan Tetap is required").max(200, "Tunjangan Tetap is too long"),
  nominal: number().min(1, "Nominal is required")
});

export const TunjanganTetapUpdateSchema = object({
  nama: string().min(1, "Tunjangan Tetap is required").max(200, "Tunjangan Tetap is too long"),
  nominal: number().min(1, "Nominal is required")
}).partial();
