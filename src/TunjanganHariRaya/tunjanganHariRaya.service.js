import {
  destroyTHRById,
  getAllTHR,
  getAllTHRByPegawai,
  getTHRById,
  insertTHR,
  updateTHRById
} from "./tunjanganHariRaya.repository.js";

export const GetAllTHR = async () => {
  const data = await getAllTHR();
  return data;
};

export const GetAllTHRByPegawai = async (pegawaiId) => {
  const data = await getAllTHRByPegawai(pegawaiId);
  return data;
};

export const GetTHRById = async (id) => {
  const data = await getTHRById(id);
  return data;
};

export const GetTHRByTahun = async (tahun) => {
  const data = await getAllTHR({ tahun });
  return data;
};

export const CreateTHR = async (data) => {
  const insert = await insertTHR(data);
  return insert;
};

export const UpdateTHRById = async (id, data) => {
  const update = await updateTHRById(id, data);
  return update;
};

export const DeleteTHRById = async (id) => {
  const destroy = await destroyTHRById(id);
  return destroy;
};
