/*
  Warnings:

  - You are about to drop the column `tipe_bukti` on the `permohonan_izin` table. All the data in the column will be lost.
  - Added the required column `format_bukti` to the `permohonan_izin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "permohonan_izin" DROP COLUMN "tipe_bukti",
ADD COLUMN     "format_bukti" "typeBukti" NOT NULL;
