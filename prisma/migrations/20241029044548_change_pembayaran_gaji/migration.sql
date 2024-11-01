-- CreateEnum
CREATE TYPE "StatusPembayaran" AS ENUM ('belum', 'proses', 'selesai');

-- AlterTable
ALTER TABLE "slip_gaji" ADD COLUMN     "status_pembayaran" "StatusPembayaran" NOT NULL DEFAULT 'belum';
