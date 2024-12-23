import { CreateAbsensi, DeleteAbsensi, GetAbsensiByTanggalPegawai } from "../Absensi/absensi.service.js";
import { GetJadwalByPegawaiTanggal } from "../JadwalPegawai/jadwalPegawai.service.js";
import { DeleteImage, GetPublicId, UploadFileIzin } from "../utils/cloudinary.js";
import {
  destroyPermohonanIzin,
  getAllPermohonanIzin,
  getAllPermohonanIzinByPegawai,
  getPermohonanIzinById,
  insertPermohonanIzin,
  updatePermohonanIzin
} from "./permohonanIzin.repository.js";

export const GetAllPermohonanIzin = async (filter = {}) => {
  const getAll = getAllPermohonanIzin(filter);

  return getAll;
};

export const GetPermohonanIzinById = async (id) => {
  const getOne = await getPermohonanIzinById(id);

  return getOne;
};

export const GetPermohonanIzinByPegawaiId = async (id) => {
  const getOne = await getAllPermohonanIzinByPegawai(id);

  return getOne;
};

export const GetPermohonanIzinByTanggal = async (tanggal, pegawai_id) => {
  return await getAllPermohonanIzin({ tanggal_dari: tanggal + "T00:00:00.000Z", pegawai_id: pegawai_id });
};

export const GetPegawaiSedangIzin = async (tanggal) => {
  const targetTanggal = new Date(`${tanggal}T00:00:00.000Z`);

  // Query untuk mencari izin yang meliputi tanggal target
  const semuaPermohonan = await getAllPermohonanIzin({
    tanggal_dari: {
      lte: targetTanggal // tanggal_dari harus kurang atau sama dengan tanggal target
    },
    tanggal_sampai: {
      gte: targetTanggal // tanggal_sampai harus lebih atau sama dengan tanggal target
    },
    status: "diterima"
  });
  return semuaPermohonan;
};

export const GetIzinByStatus = async (bulan, tahun, status) => {
  const firstDay = new Date(tahun, bulan - 1, 1);

  // Get last day of month (day 0 of next month = last day of current month)
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);

  const data = await getAllPermohonanIzin({ tanggal_dari: { gte: firstDay, lte: lastDay }, status: status });
  return data;
};

export const GetPermohonanIzinByTahun = async (tahun, pegawai_id) => {
  // Get the first day of the year
  const startDate = new Date(tahun, 0, 1);

  // Get the last day of the year
  const endDate = new Date(tahun, 11, 31, 23, 59, 59);

  // Fetch data with proper parameters
  const data = await getAllPermohonanIzin({
    tanggal_dari: { gte: startDate, lte: endDate },
    pegawai_id: pegawai_id
  });

  return data;
};

export const GetIzinByBulanTahunByPegawai = async (bulan, tahun, id) => {
  // Get first day of month
  const firstDay = new Date(tahun, bulan - 1, 1);

  // Get last day of month (day 0 of next month = last day of current month)
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);

  const data = await getAllPermohonanIzin({ tanggal_dari: { gte: firstDay, lte: lastDay }, pegawai_id: id });
  return data;
};

export const CreatePermohonanIzin = async (data) => {
  try {
    const totalHari = DifferenceDate(data.tanggal_dari, data.tanggal_sampai);
    data.total_hari = totalHari;
    const create = await insertPermohonanIzin(data);
    const uploadFile = await UploadFileIzin(data.bukti);

    let updatedFileData;
    if (uploadFile) {
      updatedFileData = await updatePermohonanIzin(create.id_permohonan_izin, {
        bukti: uploadFile.secure_url
      });
    }

    return updatedFileData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const UpdatePermohonanIzin = async (id, data) => {
  const getIzin = await getPermohonanIzinById(id);
  try {
    const update = await updatePermohonanIzin(id, data);
    let updatedFileData;
    if (data.bukti && getIzin.bukti) {
      const publicId = GetPublicId(getIzin.bukti);
      await DeleteImage(publicId);
      const uploadFile = await UploadFileIzin(data.bukti);
      updatedFileData = await updatePermohonanIzin(update.id_permohonan_izin, {
        bukti: uploadFile.secure_url
      });
    }
    return updatedFileData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const UpdateStatusPermohonanIzin = async (id, status) => {
  const getMohonIzin = await GetPermohonanIzinById(id);

  const update = await updatePermohonanIzin(id, {
    status
  });
  if (status === "diterima") {
    const pegawai = getMohonIzin.pegawai;

    const dates = getDatesBetween(getMohonIzin.tanggal_dari, getMohonIzin.tanggal_sampai);
    for await (const tanggal of dates) {
      const getJadwal = await GetJadwalByPegawaiTanggal(tanggal, pegawai.id_pegawai);
      const createAbsen = await CreateAbsensi({
        pegawai_id: pegawai.id_pegawai,
        tanggal_absen: tanggal + "T00:00:00.000Z",
        jadwal_id: getJadwal[0].id_jadwal,
        status_absen: getMohonIzin.jenis_mohon_izin
      });
    }
  } else if (getMohonIzin.status === "diterima" && status === "ditolak") {
    const pegawai = getMohonIzin.pegawai;

    const dates = getDatesBetween(getMohonIzin.tanggal_dari, getMohonIzin.tanggal_sampai);
    for await (const tanggal of dates) {
      const getAbsensi = await GetAbsensiByTanggalPegawai(tanggal, pegawai.id_pegawai);
      const destroyAbsen = await DeleteAbsensi(getAbsensi[0].id_absen);
    }
  }

  return update;
};

export const DestroyPermohonanIzin = async (id) => {
  const getIzin = await getPermohonanIzinById(id);
  try {
    const destroy = await destroyPermohonanIzin(id);
    if (getIzin.bukti) {
      const publicId = GetPublicId(getIzin.bukti);
      await DeleteImage(publicId);
    }
    return destroy;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AmbilFormatBukti = (bukti) => {
  const formatBukti = ["pdf", "jpg", "jpeg", "png", "PDF", "JPG", "JPEG", "PNG"];
  const ambilFormatBukti = bukti.split(".")[1];
  if (!formatBukti.includes(ambilFormatBukti)) return false;

  return ambilFormatBukti === "pdf" ? "pdf" : "image";
};

export const DifferenceDate = (tglDari, tglSampai) => {
  const date1 = new Date(tglDari);
  const date2 = new Date(tglSampai);
  let Difference_In_Time = date2.getTime() - date1.getTime();
  // hitung jml hari antara dua tanggal
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
  return Math.floor(Difference_In_Days);
};

function getDatesBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateArray = [];

  // Loop hingga tanggal start lebih dari end
  while (start <= end) {
    // Menambahkan tanggal dalam format YYYY-MM-DD ke array
    dateArray.push(start.toISOString().split("T")[0]);

    // Menambahkan 1 hari ke tanggal start
    start.setDate(start.getDate() + 1);
  }

  return dateArray;
}
