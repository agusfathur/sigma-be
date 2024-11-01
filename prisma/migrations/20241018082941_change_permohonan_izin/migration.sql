-- DropForeignKey
ALTER TABLE "permohonan_izin" DROP CONSTRAINT "permohonan_izin_pegawai_id_fkey";

-- AlterTable
ALTER TABLE "permohonan_izin" ADD COLUMN     "userId_user" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "permohonan_izin" ADD CONSTRAINT "permohonan_izin_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_izin" ADD CONSTRAINT "permohonan_izin_userId_user_fkey" FOREIGN KEY ("userId_user") REFERENCES "user"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
