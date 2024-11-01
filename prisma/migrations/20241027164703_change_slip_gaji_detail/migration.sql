/*
  Warnings:

  - Added the required column `bulan` to the `slip_gaji_detail_bonus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_fungsional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_gaji_pokok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_kehadiran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_lembur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_pajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_pinjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_potong_gaji` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bulan` to the `slip_gaji_detail_tetap` table without a default value. This is not possible if the table is not empty.
  - Made the column `tanggal` on table `tunjangan_bonus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "slip_gaji_detail_bonus" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_fungsional" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_gaji_pokok" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_kehadiran" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_lembur" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_pajak" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_pinjaman" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_potong_gaji" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_tetap" ADD COLUMN     "bulan" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tunjangan_bonus" ALTER COLUMN "tanggal" SET NOT NULL;
