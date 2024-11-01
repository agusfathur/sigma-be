/*
  Warnings:

  - Added the required column `jenis_mohon_izin` to the `permohonan_izin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permohonan_izin" ADD COLUMN     "jenis_mohon_izin" "JenisIzin" NOT NULL;
