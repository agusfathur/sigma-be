/*
  Warnings:

  - Added the required column `tipe_bukti` to the `permohonan_izin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "typeBukti" AS ENUM ('image', 'pdf');

-- AlterTable
ALTER TABLE "permohonan_izin" ADD COLUMN     "tipe_bukti" "typeBukti" NOT NULL;
