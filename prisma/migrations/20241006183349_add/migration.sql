/*
  Warnings:

  - Changed the type of `jatah` on the `jenis_izin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "jenis_izin" DROP COLUMN "jatah",
ADD COLUMN     "jatah" INTEGER NOT NULL;
