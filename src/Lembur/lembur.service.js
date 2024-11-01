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
  let date = new Date(`${tahun}-${bulan}`);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const data = await getAllLembur({
    tanggal: {
      gte: firstDay,
      lte: lastDay
    }
  });
  return data;
};

export const GetALemburByPegawaiAndBulanTahunStatus = async (pegawaiId, status_lembur, bulan, tahun) => {
  let date = new Date(`${tahun}-${bulan}`);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
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
  let date = new Date(`${tahun}-${bulan}`);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
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
