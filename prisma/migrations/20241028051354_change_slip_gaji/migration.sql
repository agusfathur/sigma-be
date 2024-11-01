/*
  Warnings:

  - You are about to drop the column `total_gaji` on the `slip_gaji` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "slip_gaji" DROP COLUMN "total_gaji",
ADD COLUMN     "total_gaji_bersih" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_gaji_kotor" INTEGER NOT NULL DEFAULT 0;
