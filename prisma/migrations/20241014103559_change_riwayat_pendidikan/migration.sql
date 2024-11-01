/*
  Warnings:

  - You are about to alter the column `riwayat_pendidikan` on the `pegawai` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "pegawai" ALTER COLUMN "riwayat_pendidikan" SET NOT NULL,
ALTER COLUMN "riwayat_pendidikan" SET DATA TYPE VARCHAR(255);
