/*
  Warnings:

  - The primary key for the `slip_gaji_detail_pajak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_slip_gaji_detai_pajak` on the `slip_gaji_detail_pajak` table. All the data in the column will be lost.
  - The required column `id_slip_gaji_detail_pajak` was added to the `slip_gaji_detail_pajak` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "slip_gaji_detail_pajak" DROP CONSTRAINT "slip_gaji_detail_pajak_pkey",
DROP COLUMN "id_slip_gaji_detai_pajak",
ADD COLUMN     "id_slip_gaji_detail_pajak" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "slip_gaji_detail_pajak_pkey" PRIMARY KEY ("id_slip_gaji_detail_pajak");
