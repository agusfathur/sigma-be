/*
  Warnings:

  - You are about to drop the `jadwal_cuti` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total_hari` to the `permohonan_izin` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "jadwal_cuti" DROP CONSTRAINT "jadwal_cuti_jenis_izin_id_fkey";

-- DropForeignKey
ALTER TABLE "jadwal_cuti" DROP CONSTRAINT "jadwal_cuti_permohonan_izin_id_fkey";

-- AlterTable
ALTER TABLE "permohonan_izin" ADD COLUMN     "total_hari" INTEGER NOT NULL;

-- DropTable
DROP TABLE "jadwal_cuti";
