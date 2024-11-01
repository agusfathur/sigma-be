/*
  Warnings:

  - Added the required column `pegawai_id` to the `lembur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lembur" ADD COLUMN     "pegawai_id" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "lembur" ADD CONSTRAINT "lembur_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE RESTRICT ON UPDATE CASCADE;
