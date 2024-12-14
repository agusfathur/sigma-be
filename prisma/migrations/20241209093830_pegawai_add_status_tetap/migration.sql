-- CreateEnum
CREATE TYPE "StatusTetap" AS ENUM ('tetap', 'tidak_tetap');

-- AlterTable
ALTER TABLE "pegawai" ADD COLUMN     "status_tetap" "StatusTetap" NOT NULL DEFAULT 'tidak_tetap';
