/*
  Warnings:

  - The `riwayat_pendidikan` column on the `pegawai` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pegawai" DROP COLUMN "riwayat_pendidikan",
ADD COLUMN     "riwayat_pendidikan" VARCHAR(255)[];
