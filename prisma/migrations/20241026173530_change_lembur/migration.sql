/*
  Warnings:

  - Made the column `tanggal` on table `lembur` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lembur" ALTER COLUMN "tanggal" SET NOT NULL;
