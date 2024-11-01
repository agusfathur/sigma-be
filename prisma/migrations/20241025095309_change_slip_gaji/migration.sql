/*
  Warnings:

  - Added the required column `pegawai_id` to the `slip_gaji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slip_gaji" ADD COLUMN     "pegawai_id" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "setting_gaji" (
    "id_setting_gaji" VARCHAR(255) NOT NULL,
    "gaji_pokok" BOOLEAN,
    "tunjangan_tetap" BOOLEAN,
    "tunjangan_fungsional" BOOLEAN,
    "tunjangan_bonus" BOOLEAN,
    "tunjangan_lembur" BOOLEAN,
    "pinjaman" BOOLEAN,
    "potong_gaji" BOOLEAN,
    "tunjangan_kehadiran_id" VARCHAR(255)[],
    "pajak_id" VARCHAR(255)[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setting_gaji_pkey" PRIMARY KEY ("id_setting_gaji")
);

-- AddForeignKey
ALTER TABLE "slip_gaji" ADD CONSTRAINT "slip_gaji_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE RESTRICT ON UPDATE CASCADE;
