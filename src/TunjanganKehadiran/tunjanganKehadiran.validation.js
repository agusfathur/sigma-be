import { object, number } from "zod";

export const TunjanganKehadiranCreateSchema = object({
  nominal: number().min(1, "Tunjangan Tetap is required"),
  tahun: number().min(1, "Nominal is required")
});

export const TunjanganKehadiranUpdateSchema = object({
  nominal: number().min(1, "Tunjangan Tetap is required"),
  tahun: number().min(1, "Nominal is required")
}).partial();
