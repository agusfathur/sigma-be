/*
  Warnings:

  - You are about to drop the column `jam_kerja_id` on the `absensi` table. All the data in the column will be lost.
  - You are about to drop the `jam_kerja` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shift_kerja_id` to the `absensi` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "absensi" DROP CONSTRAINT "absensi_jam_kerja_id_fkey";

-- AlterTable
ALTER TABLE "absensi" DROP COLUMN "jam_kerja_id",
ADD COLUMN     "shift_kerja_id" VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE "jam_kerja";

-- CreateTable
CREATE TABLE "shift_kerja" (
    "id_shift_kerja" VARCHAR(255) NOT NULL,
    "shift_kerja" "JenisShiftKerja" NOT NULL,
    "waktu_masuk" VARCHAR(255) NOT NULL,
    "waktu_pulang" VARCHAR(255) NOT NULL,
    "durasi_kerja" INTEGER NOT NULL,
    "keterangan" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shift_kerja_pkey" PRIMARY KEY ("id_shift_kerja")
);

-- CreateTable
CREATE TABLE "jadwal_mingguan" (
    "id_jadwal_mingguan" VARCHAR(255) NOT NULL,
    "periode" TEXT NOT NULL,
    "tanggal_dari" TIMESTAMP(3) NOT NULL,
    "tanggal_sampai" TIMESTAMP(3) NOT NULL,
    "shift_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jadwal_mingguan_pkey" PRIMARY KEY ("id_jadwal_mingguan")
);

-- CreateTable
CREATE TABLE "jadwal_pegawai" (
    "id_jadwal" VARCHAR(255) NOT NULL,
    "pegawai_id" TEXT NOT NULL,
    "jadwal_mingguan_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jadwal_pegawai_pkey" PRIMARY KEY ("id_jadwal")
);

-- AddForeignKey
ALTER TABLE "jadwal_mingguan" ADD CONSTRAINT "jadwal_mingguan_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift_kerja"("id_shift_kerja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_pegawai" ADD CONSTRAINT "jadwal_pegawai_jadwal_mingguan_id_fkey" FOREIGN KEY ("jadwal_mingguan_id") REFERENCES "jadwal_mingguan"("id_jadwal_mingguan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_pegawai" ADD CONSTRAINT "jadwal_pegawai_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_shift_kerja_id_fkey" FOREIGN KEY ("shift_kerja_id") REFERENCES "shift_kerja"("id_shift_kerja") ON DELETE CASCADE ON UPDATE CASCADE;
