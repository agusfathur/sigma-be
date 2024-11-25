/*
  Warnings:

  - Made the column `nomor_rekening` on table `pegawai` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "pegawai_nomor_rekening_key";

-- AlterTable
ALTER TABLE "pegawai" ALTER COLUMN "nomor_rekening" SET NOT NULL,
ALTER COLUMN "nomor_rekening" SET DEFAULT '';
