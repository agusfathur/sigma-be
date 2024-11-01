/*
  Warnings:

  - Changed the type of `status_absen` on the `absensi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusAbsensi" AS ENUM ('hadir', 'izin', 'cuti', 'sakit', 'terlambat', 'tidak_hadir');

-- AlterTable
ALTER TABLE "absensi" DROP COLUMN "status_absen",
ADD COLUMN     "status_absen" "StatusAbsensi" NOT NULL;
