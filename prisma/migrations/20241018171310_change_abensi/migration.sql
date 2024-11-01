/*
  Warnings:

  - You are about to drop the column `shift_kerja_id` on the `absensi` table. All the data in the column will be lost.
  - You are about to drop the column `jadwal_mingguan_id` on the `jadwal_pegawai` table. All the data in the column will be lost.
  - You are about to alter the column `pegawai_id` on the `jadwal_pegawai` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the `jadwal_mingguan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `shift_id` to the `jadwal_pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `jadwal_pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "absensi" DROP CONSTRAINT "absensi_shift_kerja_id_fkey";

-- DropForeignKey
ALTER TABLE "jadwal_mingguan" DROP CONSTRAINT "jadwal_mingguan_shift_id_fkey";

-- DropForeignKey
ALTER TABLE "jadwal_pegawai" DROP CONSTRAINT "jadwal_pegawai_jadwal_mingguan_id_fkey";

-- DropForeignKey
ALTER TABLE "jadwal_pegawai" DROP CONSTRAINT "jadwal_pegawai_pegawai_id_fkey";

-- AlterTable
ALTER TABLE "absensi" DROP COLUMN "shift_kerja_id",
ADD COLUMN     "jadwal_id" VARCHAR(255),
ALTER COLUMN "is_lembur" SET DEFAULT false;

-- AlterTable
ALTER TABLE "jadwal_pegawai" DROP COLUMN "jadwal_mingguan_id",
ADD COLUMN     "shift_id" VARCHAR(255) NOT NULL,
ADD COLUMN     "tanggal" DATE NOT NULL,
ALTER COLUMN "pegawai_id" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "jadwal_mingguan";

-- CreateIndex
CREATE INDEX "absensi_pegawai_id_idx" ON "absensi"("pegawai_id");

-- CreateIndex
CREATE INDEX "absensi_jadwal_id_idx" ON "absensi"("jadwal_id");

-- CreateIndex
CREATE INDEX "jadwal_pegawai_pegawai_id_idx" ON "jadwal_pegawai"("pegawai_id");

-- CreateIndex
CREATE INDEX "jadwal_pegawai_shift_id_idx" ON "jadwal_pegawai"("shift_id");

-- AddForeignKey
ALTER TABLE "jadwal_pegawai" ADD CONSTRAINT "jadwal_pegawai_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_pegawai" ADD CONSTRAINT "jadwal_pegawai_shift_id_fkey" FOREIGN KEY ("shift_id") REFERENCES "shift_kerja"("id_shift_kerja") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_jadwal_id_fkey" FOREIGN KEY ("jadwal_id") REFERENCES "jadwal_pegawai"("id_jadwal") ON DELETE SET NULL ON UPDATE CASCADE;
