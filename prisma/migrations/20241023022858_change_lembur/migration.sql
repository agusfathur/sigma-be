/*
  Warnings:

  - You are about to drop the column `total_lembur` on the `slip_gaji_detail_lembur` table. All the data in the column will be lost.
  - You are about to drop the `rate_lembur` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tunjangan_lembur` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lembur_id` to the `slip_gaji_detail_lembur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_upah` to the `slip_gaji_detail_lembur` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tunjangan_lembur" DROP CONSTRAINT "tunjangan_lembur_absen_id_fkey";

-- DropForeignKey
ALTER TABLE "tunjangan_lembur" DROP CONSTRAINT "tunjangan_lembur_pegawai_id_fkey";

-- DropForeignKey
ALTER TABLE "tunjangan_lembur" DROP CONSTRAINT "tunjangan_lembur_rate_lembur_id_fkey";

-- AlterTable
ALTER TABLE "slip_gaji_detail_lembur" DROP COLUMN "total_lembur",
ADD COLUMN     "lembur_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "total_upah" INTEGER NOT NULL;

-- DropTable
DROP TABLE "rate_lembur";

-- DropTable
DROP TABLE "tunjangan_lembur";

-- CreateTable
CREATE TABLE "lembur" (
    "id_lembur" VARCHAR(255) NOT NULL,
    "absensi_id" VARCHAR(255) NOT NULL,
    "total_upah" INTEGER NOT NULL,
    "total_jam" INTEGER NOT NULL,
    "rincian" VARCHAR(255) NOT NULL,
    "status_lembur" "StatusTerima" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lembur_pkey" PRIMARY KEY ("id_lembur")
);

-- AddForeignKey
ALTER TABLE "lembur" ADD CONSTRAINT "lembur_absensi_id_fkey" FOREIGN KEY ("absensi_id") REFERENCES "absensi"("id_absen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_lembur" ADD CONSTRAINT "slip_gaji_detail_lembur_lembur_id_fkey" FOREIGN KEY ("lembur_id") REFERENCES "lembur"("id_lembur") ON DELETE RESTRICT ON UPDATE CASCADE;
