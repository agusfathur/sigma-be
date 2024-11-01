/*
  Warnings:

  - Added the required column `singkatan_sistem` to the `app_setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_setting" ADD COLUMN     "singkatan_sistem" VARCHAR(255) NOT NULL;
