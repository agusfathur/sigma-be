import { object, string } from "zod";
import { MetodePembayaran } from "@prisma/client";
import { GetUserById } from "../User/user.service.js";
import { GetSlipGajiById } from "../SlipGaji/slipGaji.service.js";

export const pembayaranGajiCreateSchema = object({
  slip_gaji_id: string().min(1, "Slip gaji is required"),
  user_id: string().min(1, "User is required"),
  metode_pembayaran: string().min(1, "Metode pembayaran is required"),
  nomor_transaksi: string().optional().default(null)
})
  .refine(
    async (data) => {
      const slipGaji = await GetSlipGajiById(data.slip_gaji_id);
      return slipGaji;
    },
    {
      message: "Slip gaji not found",
      path: ["slip_gaji_id"]
    }
  )
  .refine(
    async (data) => {
      const user = await GetUserById(data.user_id);
      return user;
    },
    {
      message: "User not found",
      path: ["user_id"]
    }
  )
  .refine(
    (data) => {
      const metodePembayaran = MetodePembayaran[data.metode_pembayaran];
      return metodePembayaran;
    },
    {
      message: "Metode pembayaran not found",
      path: ["metode_pembayaran"]
    }
  );

export const pembayaranGajiUpdateSchema = object({
  slip_gaji_id: string().min(1, "Slip gaji is required"),
  user_id: string().min(1, "User is required"),
  metode_pembayaran: string().min(1, "Metode pembayaran is required"),
  nomor_transaksi: string().optional().default(null)
})
  .partial()
  .refine(
    async (data) => {
      if (!data.slip_gaji_id) return true;
      const slipGaji = await GetSlipGajiById(data.slip_gaji_id);
      return slipGaji;
    },
    {
      message: "Slip gaji not found",
      path: ["slip_gaji_id"]
    }
  )
  .refine(
    async (data) => {
      if (!data.user_id) return true;
      const user = await GetUserById(data.user_id);
      return user;
    },
    {
      message: "User not found",
      path: ["user_id"]
    }
  )
  .refine(
    (data) => {
      if (!data.metode_pembayaran) return true;
      const metodePembayaran = MetodePembayaran[data.metode_pembayaran];
      return metodePembayaran;
    },
    {
      message: "Metode pembayaran not found",
      path: ["metode_pembayaran"]
    }
  );
