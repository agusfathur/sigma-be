/*
  Warnings:

  - Changed the type of `nominal` on the `tunjangan_kehadiran` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tunjangan_kehadiran" DROP COLUMN "nominal",
ADD COLUMN     "nominal" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tunjangan_tetap" ALTER COLUMN "nama" SET DATA TYPE VARCHAR(255);
