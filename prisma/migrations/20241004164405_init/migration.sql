-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'kepala_madrasah', 'user');

-- CreateEnum
CREATE TYPE "Agama" AS ENUM ('islam', 'kristen', 'katolik', 'hindu', 'buddha', 'konghucu');

-- CreateEnum
CREATE TYPE "StatusPegawai" AS ENUM ('aktif', 'pindah', 'berhenti', 'meninggal', 'pensiun');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('laki_laki', 'perempuan');

-- CreateEnum
CREATE TYPE "TenagaRole" AS ENUM ('pendidik', 'kependidikan');

-- CreateEnum
CREATE TYPE "StatusTerima" AS ENUM ('diterima', 'ditolak');

-- CreateEnum
CREATE TYPE "MetodePembayaran" AS ENUM ('cash', 'transfer');

-- CreateEnum
CREATE TYPE "JenisIzin" AS ENUM ('cuti', 'izin');

-- CreateEnum
CREATE TYPE "JenisShiftKerja" AS ENUM ('masa_mbkm', 'libur_mbkm');

-- CreateEnum
CREATE TYPE "StatusAbsenLibur" AS ENUM ('hadir', 'tidak_hadir');

-- CreateTable
CREATE TABLE "user" (
    "id_user" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "jabatan" (
    "id_jabatan" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "gaji" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jabatan_pkey" PRIMARY KEY ("id_jabatan")
);

-- CreateTable
CREATE TABLE "jabatan_fungsional" (
    "id_jabatan_fungsional" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "tunjangan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jabatan_fungsional_pkey" PRIMARY KEY ("id_jabatan_fungsional")
);

-- CreateTable
CREATE TABLE "status_kepegawaian" (
    "id_status_kepegawaian" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "status_kepegawaian_pkey" PRIMARY KEY ("id_status_kepegawaian")
);

-- CreateTable
CREATE TABLE "pegawai" (
    "id_pegawai" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "nomor_hp" VARCHAR(255) NOT NULL,
    "foto" VARCHAR(255),
    "nik" VARCHAR(255) NOT NULL,
    "nip" VARCHAR(255),
    "tempat_lahir" VARCHAR(255) NOT NULL,
    "tanggal_lahir" DATE NOT NULL,
    "tanggal_pensiun" DATE NOT NULL,
    "gender" "Gender" NOT NULL,
    "agama" "Agama" NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "tenaga" "TenagaRole" NOT NULL DEFAULT 'pendidik',
    "jabatan_id" VARCHAR(255) NOT NULL,
    "status_kepegawaian_id" VARCHAR(255) NOT NULL,
    "riwayat_pendidikan" VARCHAR(255) NOT NULL,
    "jabatan_fungsional_id" VARCHAR(255) NOT NULL,
    "status_pernikahan" VARCHAR(255) NOT NULL,
    "jumlah_istri" INTEGER NOT NULL,
    "jumlah_anak" INTEGER NOT NULL,
    "nomor_rekening" VARCHAR(255) NOT NULL,
    "status_pegawai" "StatusPegawai" NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "lokasi_id" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pegawai_pkey" PRIMARY KEY ("id_pegawai")
);

-- CreateTable
CREATE TABLE "tunjangan_tetap" (
    "id_tunjangan_tetap" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nominal" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tunjangan_tetap_pkey" PRIMARY KEY ("id_tunjangan_tetap")
);

-- CreateTable
CREATE TABLE "tunjangan_tetap_pegawai" (
    "id_tunjangan_tetap_pegawai" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "tunjangan_tetap_id" VARCHAR(255) NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tunjangan_tetap_pegawai_pkey" PRIMARY KEY ("id_tunjangan_tetap_pegawai")
);

-- CreateTable
CREATE TABLE "tunjangan_kehadiran" (
    "id_tunjngan_kehadiran" VARCHAR(255) NOT NULL,
    "nominal" VARCHAR(255) NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tunjangan_kehadiran_pkey" PRIMARY KEY ("id_tunjngan_kehadiran")
);

-- CreateTable
CREATE TABLE "tunjangan_bonus" (
    "id_tunjangan_bonus" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "nominal" INTEGER NOT NULL,
    "keterangan" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tunjangan_bonus_pkey" PRIMARY KEY ("id_tunjangan_bonus")
);

-- CreateTable
CREATE TABLE "rate_lembur" (
    "id_rate_lembur" VARCHAR(255) NOT NULL,
    "jam_lembur" INTEGER NOT NULL,
    "rate_upah" REAL NOT NULL,
    "is_hari_lembur" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_lembur_pkey" PRIMARY KEY ("id_rate_lembur")
);

-- CreateTable
CREATE TABLE "tunjangan_lembur" (
    "id_tunjangan_lembur" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "absen_id" VARCHAR(255) NOT NULL,
    "total_jam_lembur" INTEGER NOT NULL,
    "total_upah_lembur" INTEGER NOT NULL,
    "status_lembur" "StatusTerima" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tunjangan_lembur_pkey" PRIMARY KEY ("id_tunjangan_lembur")
);

-- CreateTable
CREATE TABLE "pinjaman" (
    "id_pinjaman" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "tanggal" DATE NOT NULL,
    "tahun" INTEGER NOT NULL,
    "keterangan" VARCHAR(255) NOT NULL,
    "status_pinjaman" "StatusTerima" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pinjaman_pkey" PRIMARY KEY ("id_pinjaman")
);

-- CreateTable
CREATE TABLE "pajak" (
    "id_pajak" TEXT NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "persen" REAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pajak_pkey" PRIMARY KEY ("id_pajak")
);

-- CreateTable
CREATE TABLE "potong_gaji" (
    "id_potong_gaji" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "tanggal" DATE NOT NULL,
    "tahun" INTEGER NOT NULL,
    "keterangan" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "potong_gaji_pkey" PRIMARY KEY ("id_potong_gaji")
);

-- CreateTable
CREATE TABLE "tunjangan_hari_raya" (
    "id_thr" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "nominal" INTEGER NOT NULL,
    "tahun" VARCHAR(255) NOT NULL,
    "tanggal_pembayaran" DATE,
    "metode_pembayaran" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tunjangan_hari_raya_pkey" PRIMARY KEY ("id_thr")
);

-- CreateTable
CREATE TABLE "slip_gaji" (
    "id_slip_gaji" VARCHAR(255) NOT NULL,
    "gaji_pokok" INTEGER NOT NULL DEFAULT 0,
    "tunjangan_tetap" INTEGER NOT NULL DEFAULT 0,
    "tunjangan_kehadiran" INTEGER NOT NULL DEFAULT 0,
    "tunjangan_fungsional" INTEGER NOT NULL DEFAULT 0,
    "tunjangan_bonus" INTEGER NOT NULL DEFAULT 0,
    "tunjangan_lembur" INTEGER NOT NULL DEFAULT 0,
    "pajak" INTEGER NOT NULL DEFAULT 0,
    "pinjaman" INTEGER NOT NULL DEFAULT 0,
    "potong_gaji" INTEGER NOT NULL DEFAULT 0,
    "tanggal" DATE NOT NULL,
    "waktu" TIME NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_pkey" PRIMARY KEY ("id_slip_gaji")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_tetap" (
    "id_slip_gaji_detail_tetap" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "tunjangan_tetap_id" VARCHAR(255) NOT NULL,
    "tunjangan_tetap_pegawai_id" VARCHAR(255) NOT NULL,
    "total_tetap" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_tetap_pkey" PRIMARY KEY ("id_slip_gaji_detail_tetap")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_pajak" (
    "id_slip_gaji_detai_pajak" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "pajak_id" VARCHAR(255) NOT NULL,
    "total_pajak" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_pajak_pkey" PRIMARY KEY ("id_slip_gaji_detai_pajak")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_potong_gaji" (
    "id_slip_gaji_detail_potong_gaji" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "potong_gaji_id" VARCHAR(255) NOT NULL,
    "total_potong_gaji" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pajakId_pajak" TEXT,

    CONSTRAINT "slip_gaji_detail_potong_gaji_pkey" PRIMARY KEY ("id_slip_gaji_detail_potong_gaji")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_pinjaman" (
    "id_slip_gaji_detai_pinjaman" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "pinjaman_id" VARCHAR(255) NOT NULL,
    "total_pinjaman" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_pinjaman_pkey" PRIMARY KEY ("id_slip_gaji_detai_pinjaman")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_kehadiran" (
    "id_slip_gaji_detail_kehadiran" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "tunjangan_kehadiran_id" VARCHAR(255) NOT NULL,
    "total_kehadiran" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_kehadiran_pkey" PRIMARY KEY ("id_slip_gaji_detail_kehadiran")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_lembur" (
    "id_slip_gaji_detal_lembur" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "absen_id" VARCHAR(255) NOT NULL,
    "total_lembur" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_lembur_pkey" PRIMARY KEY ("id_slip_gaji_detal_lembur")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_bonus" (
    "id_slip_gaji_detail_bonus" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "bonus_id" VARCHAR(255) NOT NULL,
    "total_bonus" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_bonus_pkey" PRIMARY KEY ("id_slip_gaji_detail_bonus")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_fungsional" (
    "id_slip_gaji_detail_fungsional" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "jabatan__fungsional_id" VARCHAR(255) NOT NULL,
    "total_fungsional" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_fungsional_pkey" PRIMARY KEY ("id_slip_gaji_detail_fungsional")
);

-- CreateTable
CREATE TABLE "slip_gaji_detail_gaji_pokok" (
    "id_slip_gaji_detail_gaji_pokok" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "jabatan_id" VARCHAR(255) NOT NULL,
    "total_gaji_pokok" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slip_gaji_detail_gaji_pokok_pkey" PRIMARY KEY ("id_slip_gaji_detail_gaji_pokok")
);

-- CreateTable
CREATE TABLE "pembayaran_gaji" (
    "id_pembayaran_gaji" VARCHAR(255) NOT NULL,
    "slip_gaji_id" VARCHAR(255) NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "metode_pembayaran" "MetodePembayaran" NOT NULL,
    "nomor_transaksi" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pembayaran_gaji_pkey" PRIMARY KEY ("id_pembayaran_gaji")
);

-- CreateTable
CREATE TABLE "jenis_izin" (
    "id_kategori_izin" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "jenis" "JenisIzin" NOT NULL,
    "jatah" VARCHAR(255) NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jenis_izin_pkey" PRIMARY KEY ("id_kategori_izin")
);

-- CreateTable
CREATE TABLE "data_lokasi" (
    "id_lokasi" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "kode" VARCHAR(255) NOT NULL,
    "alamat" VARCHAR(255) NOT NULL,
    "koordinat" VARCHAR(255) NOT NULL,
    "luas_lokasi" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_lokasi_pkey" PRIMARY KEY ("id_lokasi")
);

-- CreateTable
CREATE TABLE "jam_kerja" (
    "id_jam_kerja" VARCHAR(255) NOT NULL,
    "shift_kerja" "JenisShiftKerja" NOT NULL,
    "waktu_masuk" VARCHAR(255) NOT NULL,
    "waktu_pulang" VARCHAR(255) NOT NULL,
    "tanggal_dari" DATE NOT NULL,
    "tanggal_sampai" DATE NOT NULL,
    "bulan" INTEGER NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jam_kerja_pkey" PRIMARY KEY ("id_jam_kerja")
);

-- CreateTable
CREATE TABLE "kategori_libur" (
    "id_kategori_libur" VARCHAR(255) NOT NULL,
    "jenis" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_libur_pkey" PRIMARY KEY ("id_kategori_libur")
);

-- CreateTable
CREATE TABLE "data_libur" (
    "id_libur" VARCHAR(255) NOT NULL,
    "kategori_libur_id" VARCHAR(255) NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "tanggal" DATE NOT NULL,
    "status_absen" "StatusAbsenLibur" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "data_libur_pkey" PRIMARY KEY ("id_libur")
);

-- CreateTable
CREATE TABLE "permohonan_izin" (
    "id_permohonan_izin" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "jenis_izin_id" VARCHAR(255) NOT NULL,
    "bukti" VARCHAR(255) NOT NULL,
    "tanggal_dari" DATE NOT NULL,
    "tanggal_sampai" DATE NOT NULL,
    "keterangan" VARCHAR(255) NOT NULL,
    "status" "StatusTerima" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permohonan_izin_pkey" PRIMARY KEY ("id_permohonan_izin")
);

-- CreateTable
CREATE TABLE "jadwal_cuti" (
    "id_jadwal_cuti" VARCHAR(255) NOT NULL,
    "permohonan_izin_id" VARCHAR(255) NOT NULL,
    "jenis_izin_id" VARCHAR(255) NOT NULL,
    "tanggal_cuti" DATE NOT NULL,
    "tahun" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jadwal_cuti_pkey" PRIMARY KEY ("id_jadwal_cuti")
);

-- CreateTable
CREATE TABLE "app_setting" (
    "id_app_setting" VARCHAR(255) NOT NULL,
    "nama_sistem" VARCHAR(255) NOT NULL,
    "logo_sistem" VARCHAR(255) NOT NULL,
    "deskripsi_sistem" VARCHAR(255) NOT NULL,
    "developer" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_setting_pkey" PRIMARY KEY ("id_app_setting")
);

-- CreateTable
CREATE TABLE "absensi" (
    "id_absen" VARCHAR(255) NOT NULL,
    "pegawai_id" VARCHAR(255) NOT NULL,
    "jam_kerja_id" VARCHAR(255) NOT NULL,
    "tanggal_absen" DATE NOT NULL,
    "waktu_masuk" VARCHAR(255),
    "koordinat_masuk" VARCHAR(255),
    "waktu_pulang" VARCHAR(255),
    "koordinat_pulang" VARCHAR(255),
    "foto_masuk" VARCHAR(255),
    "foto_pulang" VARCHAR(255),
    "status_absen" VARCHAR(255) NOT NULL,
    "is_lembur" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id_absen")
);

-- CreateTable
CREATE TABLE "_PegawaiJabatanFungsional" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_email_key" ON "pegawai"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nomor_hp_key" ON "pegawai"("nomor_hp");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nik_key" ON "pegawai"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nip_key" ON "pegawai"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "_PegawaiJabatanFungsional_AB_unique" ON "_PegawaiJabatanFungsional"("A", "B");

-- CreateIndex
CREATE INDEX "_PegawaiJabatanFungsional_B_index" ON "_PegawaiJabatanFungsional"("B");

-- AddForeignKey
ALTER TABLE "pegawai" ADD CONSTRAINT "pegawai_jabatan_id_fkey" FOREIGN KEY ("jabatan_id") REFERENCES "jabatan"("id_jabatan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pegawai" ADD CONSTRAINT "pegawai_status_kepegawaian_id_fkey" FOREIGN KEY ("status_kepegawaian_id") REFERENCES "status_kepegawaian"("id_status_kepegawaian") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pegawai" ADD CONSTRAINT "pegawai_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pegawai" ADD CONSTRAINT "pegawai_lokasi_id_fkey" FOREIGN KEY ("lokasi_id") REFERENCES "data_lokasi"("id_lokasi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_tetap_pegawai" ADD CONSTRAINT "tunjangan_tetap_pegawai_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_tetap_pegawai" ADD CONSTRAINT "tunjangan_tetap_pegawai_tunjangan_tetap_id_fkey" FOREIGN KEY ("tunjangan_tetap_id") REFERENCES "tunjangan_tetap"("id_tunjangan_tetap") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_bonus" ADD CONSTRAINT "tunjangan_bonus_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_lembur" ADD CONSTRAINT "tunjangan_lembur_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_lembur" ADD CONSTRAINT "tunjangan_lembur_absen_id_fkey" FOREIGN KEY ("absen_id") REFERENCES "absensi"("id_absen") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjaman" ADD CONSTRAINT "pinjaman_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "potong_gaji" ADD CONSTRAINT "potong_gaji_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tunjangan_hari_raya" ADD CONSTRAINT "tunjangan_hari_raya_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_tetap" ADD CONSTRAINT "slip_gaji_detail_tetap_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_tetap" ADD CONSTRAINT "slip_gaji_detail_tetap_tunjangan_tetap_id_fkey" FOREIGN KEY ("tunjangan_tetap_id") REFERENCES "tunjangan_tetap"("id_tunjangan_tetap") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_tetap" ADD CONSTRAINT "slip_gaji_detail_tetap_tunjangan_tetap_pegawai_id_fkey" FOREIGN KEY ("tunjangan_tetap_pegawai_id") REFERENCES "tunjangan_tetap_pegawai"("id_tunjangan_tetap_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_pajak" ADD CONSTRAINT "slip_gaji_detail_pajak_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_pajak" ADD CONSTRAINT "slip_gaji_detail_pajak_pajak_id_fkey" FOREIGN KEY ("pajak_id") REFERENCES "pajak"("id_pajak") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_potong_gaji" ADD CONSTRAINT "slip_gaji_detail_potong_gaji_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_potong_gaji" ADD CONSTRAINT "slip_gaji_detail_potong_gaji_potong_gaji_id_fkey" FOREIGN KEY ("potong_gaji_id") REFERENCES "potong_gaji"("id_potong_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_pinjaman" ADD CONSTRAINT "slip_gaji_detail_pinjaman_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_pinjaman" ADD CONSTRAINT "slip_gaji_detail_pinjaman_pinjaman_id_fkey" FOREIGN KEY ("pinjaman_id") REFERENCES "pinjaman"("id_pinjaman") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_kehadiran" ADD CONSTRAINT "slip_gaji_detail_kehadiran_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_kehadiran" ADD CONSTRAINT "slip_gaji_detail_kehadiran_tunjangan_kehadiran_id_fkey" FOREIGN KEY ("tunjangan_kehadiran_id") REFERENCES "tunjangan_kehadiran"("id_tunjngan_kehadiran") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_lembur" ADD CONSTRAINT "slip_gaji_detail_lembur_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_lembur" ADD CONSTRAINT "slip_gaji_detail_lembur_absen_id_fkey" FOREIGN KEY ("absen_id") REFERENCES "absensi"("id_absen") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_bonus" ADD CONSTRAINT "slip_gaji_detail_bonus_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_bonus" ADD CONSTRAINT "slip_gaji_detail_bonus_bonus_id_fkey" FOREIGN KEY ("bonus_id") REFERENCES "tunjangan_bonus"("id_tunjangan_bonus") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_fungsional" ADD CONSTRAINT "slip_gaji_detail_fungsional_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_fungsional" ADD CONSTRAINT "slip_gaji_detail_fungsional_jabatan__fungsional_id_fkey" FOREIGN KEY ("jabatan__fungsional_id") REFERENCES "jabatan_fungsional"("id_jabatan_fungsional") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_gaji_pokok" ADD CONSTRAINT "slip_gaji_detail_gaji_pokok_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slip_gaji_detail_gaji_pokok" ADD CONSTRAINT "slip_gaji_detail_gaji_pokok_jabatan_id_fkey" FOREIGN KEY ("jabatan_id") REFERENCES "jabatan"("id_jabatan") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran_gaji" ADD CONSTRAINT "pembayaran_gaji_slip_gaji_id_fkey" FOREIGN KEY ("slip_gaji_id") REFERENCES "slip_gaji"("id_slip_gaji") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pembayaran_gaji" ADD CONSTRAINT "pembayaran_gaji_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_libur" ADD CONSTRAINT "data_libur_kategori_libur_id_fkey" FOREIGN KEY ("kategori_libur_id") REFERENCES "kategori_libur"("id_kategori_libur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_izin" ADD CONSTRAINT "permohonan_izin_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permohonan_izin" ADD CONSTRAINT "permohonan_izin_jenis_izin_id_fkey" FOREIGN KEY ("jenis_izin_id") REFERENCES "jenis_izin"("id_kategori_izin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_cuti" ADD CONSTRAINT "jadwal_cuti_permohonan_izin_id_fkey" FOREIGN KEY ("permohonan_izin_id") REFERENCES "permohonan_izin"("id_permohonan_izin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal_cuti" ADD CONSTRAINT "jadwal_cuti_jenis_izin_id_fkey" FOREIGN KEY ("jenis_izin_id") REFERENCES "jenis_izin"("id_kategori_izin") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_pegawai_id_fkey" FOREIGN KEY ("pegawai_id") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_jam_kerja_id_fkey" FOREIGN KEY ("jam_kerja_id") REFERENCES "jam_kerja"("id_jam_kerja") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PegawaiJabatanFungsional" ADD CONSTRAINT "_PegawaiJabatanFungsional_A_fkey" FOREIGN KEY ("A") REFERENCES "jabatan_fungsional"("id_jabatan_fungsional") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PegawaiJabatanFungsional" ADD CONSTRAINT "_PegawaiJabatanFungsional_B_fkey" FOREIGN KEY ("B") REFERENCES "pegawai"("id_pegawai") ON DELETE CASCADE ON UPDATE CASCADE;
