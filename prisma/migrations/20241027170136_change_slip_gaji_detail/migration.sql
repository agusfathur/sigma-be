/*
  Warnings:

  - Added the required column `total` to the `slip_gaji_detail_kehadiran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upah_per_hadir` to the `slip_gaji_detail_kehadiran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slip_gaji_detail_kehadiran" ADD COLUMN     "total" INTEGER NOT NULL,
ADD COLUMN     "upah_per_hadir" INTEGER NOT NULL;
