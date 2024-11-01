/*
  Warnings:

  - The values [berhenti] on the enum `StatusPegawai` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPegawai_new" AS ENUM ('aktif', 'pindah', 'keluar', 'meninggal', 'pensiun');
ALTER TABLE "pegawai" ALTER COLUMN "status_pegawai" TYPE "StatusPegawai_new" USING ("status_pegawai"::text::"StatusPegawai_new");
ALTER TYPE "StatusPegawai" RENAME TO "StatusPegawai_old";
ALTER TYPE "StatusPegawai_new" RENAME TO "StatusPegawai";
DROP TYPE "StatusPegawai_old";
COMMIT;
