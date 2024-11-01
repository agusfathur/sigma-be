/*
  Warnings:

  - Added the required column `tanggal_masuk` to the `pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pegawai" ADD COLUMN     "tanggal_masuk" DATE NOT NULL;
