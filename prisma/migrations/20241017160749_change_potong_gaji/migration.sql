/*
  Warnings:

  - Added the required column `nominal` to the `potong_gaji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "potong_gaji" ADD COLUMN     "nominal" INTEGER NOT NULL;
