/*
  Warnings:

  - You are about to drop the column `total_pajak_rpInt` on the `slip_gaji_detail_pajak` table. All the data in the column will be lost.
  - Added the required column `total_pajak_rupiah` to the `slip_gaji_detail_pajak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slip_gaji_detail_pajak" DROP COLUMN "total_pajak_rpInt",
ADD COLUMN     "total_pajak_rupiah" INTEGER NOT NULL;
