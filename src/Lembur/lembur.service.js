import { destroyLembur, getAllLembur, getLemburById, updateLembur } from "./lembur.repository.js";

export const GetAllLembur = async (filter = {}) => {
  const data = await getAllLembur(filter);
  return data;
};

export const GetLemburById = async (id) => {
  const data = await getLemburById(id);
  return data;
};

export const GetAllLemburByPegawai = async (id) => {
  const data = await getAllLembur({
    absensi: {
      pegawai_id: id
    }
  });
  return data;
};

export const GetAllLemburByTanggal = async (tanggal) => {
  const data = await getAllLembur({ tanggal: tanggal + "T00:00:00.000Z" });
  return data;
};

export const GetLemburPegawaiByTanggal = async (tanggal) => {
  const data = await getAllLembur({ tanggal: tanggal + "T00:00:00.000Z" });
  return data;
};

export const GetLemburPegawaiByPegawaiTanggal = async (id, tanggal) => {
  const data = await getAllLembur({ pegawai_id: id, tanggal: tanggal + "T00:00:00.000Z" });
  return data;
};
export const GetLemburByTanggalStatus = async (tanggal, status) => {
  const data = await getAllLembur({ status_lembur: status, tanggal: tanggal + "T00:00:00.000Z" });
  return data;
};

export const GetAllLemburByPegawaiAndStatus = async (id, status) => {
  const data = await getAllLembur({
    absensi: {
      pegawai_id: id,
      status_absen: status
    }
  });
  return data;
};

export const GetAllLemburByBulanTahun = async (bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllLembur({
    tanggal: {
      gte: firstDay,
      lte: lastDay
    }
  });
  return data;
};

export const GetAllLemburByStatus = async (bulan, tahun, status) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllLembur({
    tanggal: {
      gte: firstDay,
      lte: lastDay
    },
    status_lembur: status
  });
  return data;
};

export const GetALemburByPegawaiAndBulanTahunStatus = async (pegawaiId, status_lembur, bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllLembur({
    pegawai_id: pegawaiId,
    status_lembur,
    tanggal: {
      gte: firstDay,
      lte: lastDay
    }
  });
  return data;
};

export const GetALemburByPegawaiAndBulanTahun = async (pegawaiId, bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllLembur({
    pegawai_id: pegawaiId,
    tanggal: {
      gte: firstDay,
      lte: lastDay
    }
  });
  return data;
};

export const UpdateStatusLemburPegawai = async (id, data) => {
  const update = await updateLembur(id, { status_lembur: data });
  return update;
};

export const CreateLembur = async (data) => {
  const create = await insertLembur(data);
  return create;
};

export const UpdateLembur = async (id, data) => {
  const update = await updateLembur(id, data);
  return update;
};

export const DeleteLembur = async (id) => {
  const deleteData = await destroyLembur(id);
  return deleteData;
};
