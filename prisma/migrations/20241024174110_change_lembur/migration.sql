/*
  Warnings:

  - Added the required column `jumlah_upah` to the `lembur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lembur" ADD COLUMN     "jumlah_upah" INTEGER NOT NULL;
