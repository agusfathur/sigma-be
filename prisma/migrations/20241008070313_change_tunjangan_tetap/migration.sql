/*
  Warnings:

  - The primary key for the `tunjangan_kehadiran` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_tunjngan_kehadiran` on the `tunjangan_kehadiran` table. All the data in the column will be lost.
  - The required column `id_tunjangan_kehadiran` was added to the `tunjangan_kehadiran` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "slip_gaji_detail_kehadiran" DROP CONSTRAINT "slip_gaji_detail_kehadiran_tunjangan_kehadiran_id_fkey";

-- AlterTable
ALTER TABLE "tunjangan_kehadiran" DROP CONSTRAINT "tunjangan_kehadiran_pkey",
DROP COLUMN "id_tunjngan_kehadiran",
ADD COLUMN     "id_tunjangan_kehadiran" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "tunjangan_kehadiran_pkey" PRIMARY KEY ("id_tunjangan_kehadiran");

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_kehadiran" ADD CONSTRAINT "slip_gaji_detail_kehadiran_tunjangan_kehadiran_id_fkey" FOREIGN KEY ("tunjangan_kehadiran_id") REFERENCES "tunjangan_kehadiran"("id_tunjangan_kehadiran") ON DELETE CASCADE ON UPDATE CASCADE;
