/*
  Warnings:

  - You are about to alter the column `tunjangan_kehadiran_id` on the `setting_gaji` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "setting_gaji" ALTER COLUMN "tunjangan_kehadiran_id" SET NOT NULL,
ALTER COLUMN "tunjangan_kehadiran_id" SET DATA TYPE VARCHAR(255);
