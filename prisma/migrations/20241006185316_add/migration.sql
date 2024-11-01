/*
  Warnings:

  - The primary key for the `jenis_izin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_kategori_izin` on the `jenis_izin` table. All the data in the column will be lost.
  - The required column `id_jenis_izin` was added to the `jenis_izin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "jadwal_cuti" DROP CONSTRAINT "jadwal_cuti_jenis_izin_id_fkey";

-- DropForeignKey
ALTER TABLE "permohonan_izin" DROP CONSTRAINT "permohonan_izin_jenis_izin_id_fkey";

-- AlterTable
ALTER TABLE "jenis_izin" DROP CONSTRAINT "jenis_izin_pkey",
DROP COLUMN "id_kategori_izin",
ADD COLUMN     "id_jenis_izin" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "jenis_izin_pkey" PRIMARY KEY ("id_jenis_izin");

-- AddForeignKey
ALTER TABLE "permohonan_izin" ADD CONSTRAINT "permohonan_izin_jenis_izin_id_fkey" FOREIGN KEY ("jenis_izin_id") REFERENCES "jenis_izin"("id_jenis_izin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_cuti" ADD CONSTRAINT "jadwal_cuti_jenis_izin_id_fkey" FOREIGN KEY ("jenis_izin_id") REFERENCES "jenis_izin"("id_jenis_izin") ON DELETE CASCADE ON UPDATE CASCADE;
