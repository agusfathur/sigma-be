/*
  Warnings:

  - Changed the type of `nama` on the `tunjangan_tetap` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tunjangan_tetap" DROP COLUMN "nama",
ADD COLUMN     "nama" INTEGER NOT NULL;
