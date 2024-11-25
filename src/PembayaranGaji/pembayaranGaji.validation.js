import { object, string } from "zod";
import { MetodePembayaran } from "@prisma/client";
import { GetUserById } from "../User/user.service.js";
import { GetSlipGajiById } from "../SlipGaji/slipGaji.service.js";

export const pembayaranGajiCreateSchema = object({
  slip_gaji_id: string().min(1, "Slip gaji is required"),
  user_id: string().min(1, "User is required"),
  metode_pembayaran: string().min(1, "Metode pembayaran is required"),
  tanggal_pembayaran: string().min(1, "Tanggal pembayaran is required"),
  nomor_transaksi: string().optional().default(null)
});

export const pembayaranGajiUpdateSchema = object({
  slip_gaji_id: string().min(1, "Slip gaji is required"),
  user_id: string().min(1, "User is required"),
  metode_pembayaran: string().min(1, "Metode pembayaran is required"),
  tanggal_pembayaran: string().min(1, "Tanggal pembayaran is required"),
  nomor_transaksi: string().optional().default(null)
}).partial();
