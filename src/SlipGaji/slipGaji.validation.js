import { number, object } from "zod";

export const SlipGajiCreateSchema = object({
  bulan: number().min(0, "bulan is required"),
  tahun: number().min(0, "tahun is required")
});
