/*
  Warnings:

  - Added the required column `nominal` to the `pinjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pinjaman" ADD COLUMN     "nominal" INTEGER NOT NULL;
