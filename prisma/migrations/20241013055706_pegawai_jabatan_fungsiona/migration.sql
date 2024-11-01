/*
  Warnings:

  - You are about to drop the column `jabatan_fungsional_id` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the `_PegawaiJabatanFungsional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PegawaiJabatanFungsional" DROP CONSTRAINT "_PegawaiJabatanFungsional_A_fkey";

-- DropForeignKey
ALTER TABLE "_PegawaiJabatanFungsional" DROP CONSTRAINT "_PegawaiJabatanFungsional_B_fkey";

-- AlterTable
ALTER TABLE "pegawai" DROP COLUMN "jabatan_fungsional_id";

-- DropTable
DROP TABLE "_PegawaiJabatanFungsional";

-- CreateTable
CREATE TABLE "PegawaiJabatanFungsional" (
    "pegawai_id" VARCHAR(255) NOT NULL,
    "jabatan_fungsional_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "PegawaiJabatanFungsional_pkey" PRIMARY KEY ("pegawai_id","jabatan_fungsional_id")
);

-- AddForeignKey
ALTER TABLE "PegawaiJabatanFungsional" ADD CONSTRAINT "PegawaiJabatanFungsional_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PegawaiJabatanFungsional" ADD CONSTRAINT "PegawaiJabatanFungsional_jabatan_fungsional_id_fkey" FOREIGN KEY ("jabatan_fungsional_id") REFERENCES "jabatan_fungsional"("id_jabatan_fungsional") ON DELETE RESTRICT ON UPDATE CASCADE;
