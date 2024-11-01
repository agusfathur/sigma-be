/*
  Warnings:

  - Added the required column `tanggal_pembayaran` to the `pembayaran_gaji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pembayaran_gaji" ADD COLUMN     "tanggal_pembayaran" DATE NOT NULL;
