-- CreateTable
CREATE TABLE "identitas_sekolah" (
    "id_identitas_sekolah" VARCHAR(255) NOT NULL,
    "nama_sekolah" VARCHAR(255) NOT NULL,
    "kementrian" TEXT NOT NULL,
    "nsm" VARCHAR(50) NOT NULL,
    "npsn" VARCHAR(50) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "akreditasi" VARCHAR(20) NOT NULL,
    "kota" VARCHAR(255) NOT NULL,
    "tanggal_berdiri" DATE NOT NULL,
    "provinsi" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "no_telp" VARCHAR(255) NOT NULL,
    "kode_pos" CHAR(5) NOT NULL,
    "fax" VARCHAR,
    "logo" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255) NOT NULL,
    "alamat" TEXT NOT NULL,

    CONSTRAINT "identitas_sekolah_pkey" PRIMARY KEY ("id_identitas_sekolah")
);
