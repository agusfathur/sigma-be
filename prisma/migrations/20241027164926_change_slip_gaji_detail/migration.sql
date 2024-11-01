/*
  Warnings:

  - Added the required column `tanggal` to the `slip_gaji_detail_bonus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_fungsional` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_gaji_pokok` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_kehadiran` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_lembur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_pajak` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_pinjaman` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_potong_gaji` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `slip_gaji_detail_tetap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slip_gaji_detail_bonus" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_fungsional" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_gaji_pokok" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_kehadiran" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_lembur" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_pajak" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_pinjaman" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_potong_gaji" ADD COLUMN     "tanggal" DATE NOT NULL;

-- AlterTable
ALTER TABLE "slip_gaji_detail_tetap" ADD COLUMN     "tanggal" DATE NOT NULL;
