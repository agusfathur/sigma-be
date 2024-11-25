/*
  Warnings:

  - Made the column `nip` on table `pegawai` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "pegawai_nip_key";

-- AlterTable
ALTER TABLE "pegawai" ALTER COLUMN "nip" SET NOT NULL,
ALTER COLUMN "nip" SET DEFAULT '';
