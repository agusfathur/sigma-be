import { number, object, string } from "zod";

export const PajakCreateSchema = object({
  nama: string().min(1, "Pajak is required").max(100, "Pajak is too long"),
  persen: number().min(1, "Persen is required")
});

export const PajakUpdateSchema = object({
  nama: string().min(1, "Pajak is required").max(100, "Pajak is too long"),
  persen: string().min(1, "Persen is required")
}).partial();
