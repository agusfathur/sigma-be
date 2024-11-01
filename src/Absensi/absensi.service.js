import { getJadwalPegawaiById } from "../JadwalPegawai/jadwalPegawai.repository.js";
import { UploadImageAbsensi } from "../utils/cloudinary.js";
import {
  destroyAbsensi,
  getAbsensiById,
  getAllAbsensi,
  getCountAbsensi,
  insertAbsensi,
  updateAbsensi
} from "./absensi.repository.js";
import { getPegawaiById } from "../Pegawai/pegawai.repository.js";
import { isWithinRadius } from "../utils/geolib.js";
import { insertLembur } from "../Lembur/lembur.repository.js";
import { getDataLiburByDate } from "../DataLibur/libur.repository.js";

export const GetAllAbsensi = async () => {
  const data = await getAllAbsensi();
  return data;
};
export const GetAbsensiById = async (id) => {
  const data = await getAbsensiById(id);
  return data;
};

export const GetAllAbsensiByPegawai = async (id) => {
  const data = await getAllAbsensi({ pegawai_id: id });
  return data;
};

export const GetAllAbsensiByJadwal = async (id) => {
  const data = await getAllAbsensi({ jadwal_id: id });
  return data;
};

export const GetAllAbsensiByPegawaiAndJadwal = async (id, id2) => {
  const data = await getAllAbsensi({ pegawai_id: id, jadwal_id: id2 });
  return data;
};

export const GetAllAbsensiByPegawaiAndStatus = async (id, status) => {
  const data = await getAllAbsensi({ pegawai_id: id, status_absen: status });
  return data;
};

export const GetAllAbsensiByJadwalAndStatus = async (id, status) => {
  const data = await getAllAbsensi({ jadwal_id: id, status_absen: status });
  return data;
};

export const GetAllAbsensiByPegawaiAndJadwalAndStatus = async (id, id2, status) => {
  const data = await getAllAbsensi({ pegawai_id: id, jadwal_id: id2, status_absen: status });
  return data;
};

export const GetAllAbsensiByStatus = async (status) => {
  const data = await getAllAbsensi({ status_absen: status });
  return data;
};

export const GetAllAbsensiByPegawaiAndStatusAndLembur = async (id, status, lembur) => {
  const data = await getAllAbsensi({ pegawai_id: id, status_absen: status, is_lembur: lembur });
  return data;
};

export const GetAllAbsensiByJadwalAndStatusAndLembur = async (id, status, lembur) => {
  const data = await getAllAbsensi({ jadwal_id: id, status_absen: status, is_lembur: lembur });
  return data;
};

export const GetAllAbsensiByBulanTahun = async (bulan, tahun) => {
  let date = new Date(`${tahun}-${bulan}`);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const data = await getAllAbsensi({ tanggal_absen: { gte: firstDay, lte: lastDay } });
  return data;
};

// enum StatusAbsensi {
//     hadir
//     izin
//     cuti
//     sakit
//     terlambat
//     tidak_hadir
// }

export const GetAllAbsensiByBulanTahunPegawai = async (pegawai_id, bulan, tahun) => {
  let date = new Date(`${tahun}-${bulan}`);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const data = await getAllAbsensi({
    pegawai_id,
    tanggal_absen: { gte: firstDay, lte: lastDay },
    OR: [
      {
        status_absen: {
          in: ["hadir", "terlambat", "cuti"]
        }
      }
    ]
  });
  return data;
};

export const CreateAbsensi = async (data) => {
  const create = await insertAbsensi(data);
  return create;
};

export const CreateAbsensiMasuk = async (data) => {
  if (!data.jadwal_id) {
    return {
      status: false,
      message: "Tidak ada jadwal hari ini",
      data: {}
    };
  }
  const now = new Date(new Date().toLocaleDateString("id-ID").split("/").reverse().join("-") + "T00:00:00.000Z");
  console.log(now);
  const checkAbsensiHariIni = await getAllAbsensi({
    tanggal_absen: now,
    pegawai_id: data.pegawai_id
  });

  if (checkAbsensiHariIni.length > 0) {
    return {
      status: false,
      message: "Absensi already exists",
      data: {}
    };
  }
  try {
    const checkAbsensiHariIni = await getAllAbsensi({
      tanggal_absen: new Date(),
      pegawai_id: data.pegawai_id
    });

    if (checkAbsensiHariIni.length > 0) {
      return {
        status: false,
        message: "Absensi already exists",
        data: {}
      };
    }

    // cek jangkauan kantor
    // absensi berdasarkan koordinat
    const dataPegawai = await getPegawaiById(data.pegawai_id);

    const koordinatKantor = dataPegawai.data_lokasi.koordinat;
    const luasKantor = dataPegawai.data_lokasi.luas_lokasi;
    const [latitudeKantor, longitudeKantor] = koordinatKantor.split(",").map((coord) => coord.trim());
    const [latitudePegawai, longitudePegawai] = data.koordinat_masuk.split(",").map((coord) => coord.trim());

    const isInRange = isWithinRadius(latitudePegawai, longitudePegawai, latitudeKantor, longitudeKantor, luasKantor);

    if (!isInRange) {
      return {
        status: false,
        statusCode: 400,
        message: "Absensi Masuk diluar jangkauan kantor",
        data: {}
      };
    }

    // data form waktu masuk
    const jamMasukPegawai = data.waktu_masuk;
    // ambil dari db sesuai jadwal pegawai
    const dataJadwal = await getJadwalPegawaiById(data.jadwal_id);
    // ambil waktu kerja
    const [hours, minutes] = dataJadwal.shift_kerja.waktu_masuk.split(":");
    const [hoursPulang, minutesPulang] = dataJadwal.shift_kerja.waktu_pulang.split(":");

    // cek jika masuk lebih awal 1 jam dari waktu kerja, tidak boleh absen
    if (Number(jamMasukPegawai.split(":")[0]) < Number(hours - 1)) {
      return {
        status: false,
        statusCode: 400,
        message: "Absensi Masuk Belum Di Buka. Di Mulai Pukul " + Number(hours - 1) + ":" + minutes,
        data: {}
      };
    } else if (Number(jamMasukPegawai.split(":")[0]) > Number(hoursPulang)) {
      return {
        status: false,
        statusCode: 400,
        message: "Absensi Masuk sudah diutup",
        data: {}
      };
    }

    const statusAbsen = {
      hadir: "hadir",
      izin: "izin",
      cuti: "cuti",
      sakit: "sakit",
      terlambat: "terlambat",
      tidakHadir: "tidak_hadir"
    };

    let statusAbsenPegawai;

    // ambil tanggal waktu masuk (WIB)
    const combinatedWaktuKerja = new Date(
      new Date(dataJadwal.tanggal).toLocaleDateString("id-ID").split("/").reverse().join("-") +
        "T" +
        hours +
        ":" +
        minutes +
        ":00.000Z"
    );
    // waktu masuk dari form
    const [hoursMasuk, minutesMasuk] = data.waktu_masuk.split(":");
    const waktuMasukPegawai = new Date(
      new Date().toLocaleDateString("id-ID").split("/").reverse().join("-") +
        "T" +
        hoursMasuk +
        ":" +
        minutesMasuk +
        ":00.000Z"
    );

    if (
      new Date(waktuMasukPegawai).toLocaleDateString("Id-ID") !==
      new Date(combinatedWaktuKerja).toLocaleDateString("Id-ID")
    ) {
      return {
        status: false,
        statusCode: 400,
        message: "Absensi Sudah Berakhir",
        data: {}
      };
    }
    if (waktuMasukPegawai > combinatedWaktuKerja) {
      statusAbsenPegawai = statusAbsen.terlambat;
    } else {
      statusAbsenPegawai = statusAbsen.hadir;
    }

    const create = await insertAbsensi({
      pegawai_id: data.pegawai_id,
      tanggal_absen: now,
      waktu_masuk: data.waktu_masuk,
      foto_masuk: data.foto_masuk,
      status_absen: statusAbsenPegawai,
      koordinat_masuk: data.koordinat_masuk,
      jadwal_id: data.jadwal_id,
      is_lembur: data.is_lembur
    });
    let createdAbsenMasuk = create;
    if (create) {
      const uploadImage = UploadImageAbsensi(data.imagePath);
      createdAbsenMasuk = await updateAbsensi(create.id_absen, {
        foto_masuk: (await uploadImage).secure_url
      });
    }
    return {
      status: true,
      message: "Absensi created successfully",
      data: createdAbsenMasuk
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: {}
    };
  }
};

// ABSEN PULANG
export const CreateAbsensiPulang = async (data) => {
  if (!data.jadwal_id) {
    return {
      status: false,
      message: "Tidak ada jadwal hari ini",
      data: {}
    };
  }
  try {
    const now = new Date(new Date().toLocaleDateString("id-ID").split("/").reverse().join("-") + "T00:00:00.000Z");
    const checkAbsensiHariIni = await getAllAbsensi({
      tanggal_absen: now,
      pegawai_id: data.pegawai_id
    });

    if (checkAbsensiHariIni.length === 0) {
      return {
        status: false,
        message: "Anda belum absen masuk di hari ini",
        data: {}
      };
    }

    if (checkAbsensiHariIni.length > 0 && checkAbsensiHariIni[0].waktu_pulang !== null) {
      return {
        status: false,
        message: "Anda sudah absen pulang di hari ini",
        data: {}
      };
    }

    // absensi berdasarkan koordinat
    const dataPegawai = await getPegawaiById(data.pegawai_id);

    const jamPulangPegawai = data.waktu_pulang;
    // ambil dari db sesuai jadwal pegawai
    const dataJadwal = await getJadwalPegawaiById(data.jadwal_id);
    // ambil waktu kerja
    const [hoursMasuk, minutesMasuk] = dataJadwal.shift_kerja.waktu_masuk.split(":");
    const [hoursPulang, minutesPulang] = dataJadwal.shift_kerja.waktu_pulang.split(":");

    // cek jika masuk lebih awal 1 jam dari waktu kerja, tidak boleh absen
    if (Number(jamPulangPegawai.split(":")[0]) < Number(hoursPulang)) {
      return {
        status: false,
        statusCode: 400,
        message: "Absensi Pulang Belum Di Buka. Di Mulai Pukul " + hoursPulang + ":" + minutesPulang,
        data: {}
      };
    }

    // cek jangkauan kantor
    const koordinatKantor = dataPegawai.data_lokasi.koordinat;
    const luasKantor = dataPegawai.data_lokasi.luas_lokasi;
    const [latitudeKantor, longitudeKantor] = koordinatKantor.split(",").map((coord) => coord.trim());
    const [latitudePegawai, longitudePegawai] = data.koordinat_pulang.split(",").map((coord) => coord.trim());

    const isInRange = isWithinRadius(latitudePegawai, longitudePegawai, latitudeKantor, longitudeKantor, luasKantor);

    if (!isInRange) {
      return {
        status: false,
        statusCode: 400,
        message: "Absensi Masuk diluar jangkauan kantor",
        data: {}
      };
    }

    const [jamPulang, menitPulang] = data.waktu_pulang.split(":");

    let kalianLembur = 0;
    const jamLembur = Number(jamPulang) - Number(hoursPulang);

    const getHariLibur = await getDataLiburByDate(now);

    if (getHariLibur) {
      // jika lembur / berangkat hari libur
      for (let i = 1; i <= jamLembur; i++) {
        if (i <= 11 && i > 9) {
          kalianLembur += 4;
        } else if (i > 8 && i <= 9) {
          kalianLembur += 3;
        } else if (i <= 8 && i >= 1) {
          kalianLembur += 2;
        }
      }
    } else {
      for (let i = 1; i <= jamLembur; i++) {
        if (i === 1) {
          kalianLembur += 1.5;
        } else {
          kalianLembur += 2;
        }
      }
    }
    let isLembur = false;
    if (jamLembur > 0) {
      const gajiPokokPegawai = dataPegawai.jabatan.gaji;
      const upahLembur = Math.floor(((gajiPokokPegawai * 1) / 173) * kalianLembur);
      const lembur = await insertLembur({
        pegawai_id: data.pegawai_id,
        absensi_id: checkAbsensiHariIni[0].id_absen,
        jumlah_upah: kalianLembur,
        total_upah: upahLembur,
        total_jam: Number(jamLembur) + Number(dataJadwal.shift_kerja.durasi_kerja),
        rincian: "Lembur",
        status_lembur: "pending"
      });
      isLembur = true;
    }

    // ganti update
    const update = await updateAbsensi(checkAbsensiHariIni[0].id_absen, {
      waktu_pulang: data.waktu_pulang,
      foto_pulang: data.foto_pulang,
      koordinat_pulang: data.koordinat_pulang,
      is_lembur: isLembur
    });
    let createdAbsenPulang = update;
    if (update) {
      const uploadImage = await UploadImageAbsensi(data.imagePath);
      createdAbsenPulang = await updateAbsensi(update.id_absen, {
        foto_pulang: uploadImage.secure_url
      });
    }
    return {
      status: true,
      message: "Absensi created successfully",
      data: createdAbsenPulang
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: {}
    };
  }
};

export const UpdateAbsensi = async (id, data) => {
  const update = await updateAbsensi(id, data);
  return update;
};

export const DeleteAbsensi = async (id) => {
  const del = await destroyAbsensi(id);
  return del;
};
