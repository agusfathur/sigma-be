/*
  Warnings:

  - Added the required column `rate_lembur_id` to the `tunjangan_lembur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `tunjangan_lembur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tunjangan_lembur" ADD COLUMN     "rate_lembur_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "tanggal" DATE NOT NULL;

-- AddForeignKey
ALTER TABLE "tunjangan_lembur" ADD CONSTRAINT "tunjangan_lembur_rate_lembur_id_fkey" FOREIGN KEY ("rate_lembur_id") REFERENCES "rate_lembur"("id_rate_lembur") ON DELETE CASCADE ON UPDATE CASCADE;
