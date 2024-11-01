/*
  Warnings:

  - The `status_pembayaran` column on the `slip_gaji` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusPmbayaran" AS ENUM ('pending', 'proses', 'dibayar');

-- AlterTable
ALTER TABLE "slip_gaji" DROP COLUMN "status_pembayaran",
ADD COLUMN     "status_pembayaran" "StatusPmbayaran" NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "StatusPembayaran";
