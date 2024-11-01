/*
  Warnings:

  - A unique constraint covering the columns `[nomor_rekening]` on the table `pegawai` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pegawai" ALTER COLUMN "nomor_rekening" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nomor_rekening_key" ON "pegawai"("nomor_rekening");
