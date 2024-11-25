import {
  destroyPotongGajiById,
  getAllPotongGaji,
  getAllPotongGajiByPegawai,
  getPotongGajiById,
  insertPotongGaji,
  updatePotongGajiById
} from "./potongGaji.repository.js";

export const GetAllPotongGaji = async () => {
  const data = await getAllPotongGaji();
  return data;
};

export const GetAllPotongGajiByPegawai = async (pegawaiId) => {
  const data = await getAllPotongGajiByPegawai(pegawaiId);
  return data;
};

export const GetPotonGajiPegawaibyTahunBulan = async (pegawai_id, bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllPotongGaji({
    pegawai_id,
    tanggal: { gte: firstDay, lte: lastDay }
  });
  return data;
};

export const GetPotongGajiById = async (id) => {
  const data = await getPotongGajiById(id);
  return data;
};

export const CreatePotongGaji = async (data) => {
  const insert = await insertPotongGaji(data);
  return insert;
};

export const UpdatePotongGajiById = async (id, data) => {
  const update = await updatePotongGajiById(id, data);
  return update;
};

export const DeletePotongGajiById = async (id) => {
  const destroy = await destroyPotongGajiById(id);
  return destroy;
};
