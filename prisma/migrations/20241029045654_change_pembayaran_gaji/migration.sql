/*
  Warnings:

  - The values [belum,selesai] on the enum `StatusPembayaran` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPembayaran_new" AS ENUM ('pending', 'proses', 'dibayar');
ALTER TABLE "slip_gaji" ALTER COLUMN "status_pembayaran" DROP DEFAULT;
ALTER TABLE "slip_gaji" ALTER COLUMN "status_pembayaran" TYPE "StatusPembayaran_new" USING ("status_pembayaran"::text::"StatusPembayaran_new");
ALTER TYPE "StatusPembayaran" RENAME TO "StatusPembayaran_old";
ALTER TYPE "StatusPembayaran_new" RENAME TO "StatusPembayaran";
DROP TYPE "StatusPembayaran_old";
ALTER TABLE "slip_gaji" ALTER COLUMN "status_pembayaran" SET DEFAULT 'pending';
COMMIT;

-- AlterTable
ALTER TABLE "slip_gaji" ALTER COLUMN "status_pembayaran" SET DEFAULT 'pending';
