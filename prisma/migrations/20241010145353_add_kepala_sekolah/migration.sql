/*
  Warnings:

  - Added the required column `kepala_sekolah` to the `identitas_sekolah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "identitas_sekolah" ADD COLUMN     "kepala_sekolah" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "identitas_sekolah" ADD CONSTRAINT "identitas_sekolah_kepala_sekolah_fkey" FOREIGN KEY ("kepala_sekolah") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;
