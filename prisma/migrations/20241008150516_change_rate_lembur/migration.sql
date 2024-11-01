/*
  Warnings:

  - You are about to drop the column `is_hari_lembur` on the `rate_lembur` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rate_lembur" DROP COLUMN "is_hari_lembur",
ADD COLUMN     "is_hari_libur" BOOLEAN NOT NULL DEFAULT false;
