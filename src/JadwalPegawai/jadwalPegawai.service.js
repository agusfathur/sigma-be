import {
  destroyJadwalPegawai,
  getAllJadwalPegawai,
  getAllJadwalPegawaiByPegawai,
  getJadwalPegawaiById,
  insertJadwalPegawai,
  updateJadwalPegawai
} from "./jadwalPegawai.repository.js";

export const GetAllJadwalPegawai = async (filter = {}) => {
  const data = await getAllJadwalPegawai(filter);
  return data;
};

export const GetAllJadwalPegawaiByBulanTahun = async (bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 2);
  const lastDay = new Date(tahun, bulan, 1);

  const data = await getAllJadwalPegawai({ tanggal: { gte: firstDay, lte: lastDay } });
  return data;
};

export const GetAllJadwalPegawaiByTahun = async (tahun, pegawai_id) => {
  // Get the first day of the year
  const startDate = new Date(tahun, 0, 1);

  // Get the last day of the year
  const endDate = new Date(tahun, 11, 31, 23, 59, 59);

  // Fetch data with proper parameters
  const data = await getAllJadwalPegawai({
    tanggal: { gte: startDate, lte: endDate },
    pegawai_id: pegawai_id
  });

  return data;
};

export const GetAllJadwalPegawaiByPegawaiBulanTahun = async (bulan, tahun, id) => {
  const firstDay = new Date(tahun, bulan - 1, 2);
  const lastDay = new Date(tahun, bulan, 1);
  const data = await getAllJadwalPegawai({ tanggal: { gte: firstDay, lte: lastDay }, pegawai_id: id });
  return data;
};

export const GetJadwalByTanggal = async (tanggal) => {
  const data = await getAllJadwalPegawai({ tanggal: tanggal + "T00:00:00.000Z" });
  return data;
};

export const GetJadwalByPegawaiTanggal = async (tanggal, id) => {
  const data = await getAllJadwalPegawai({ tanggal: tanggal + "T00:00:00.000Z", pegawai_id: id });
  return data;
};

export const GetJadwalPegawaiById = async (id) => {
  const data = await getJadwalPegawaiById(id);
  return data;
};

export const GetAllJadwalPegawaiByPegawai = async (id) => {
  const data = await getAllJadwalPegawaiByPegawai(id);
  return data;
};

export const CreateJadwalPegawai = async (data) => {
  const result = await insertJadwalPegawai(data);
  return result;
};

export const UpdateJadwalPegawai = async (id, data) => {
  const result = await updateJadwalPegawai(id, data);
  return result;
};

export const DestroyJadwalPegawai = async (id) => {
  const result = await destroyJadwalPegawai(id);
  return result;
};
