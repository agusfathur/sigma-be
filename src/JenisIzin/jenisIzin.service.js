import {
  deleteJenisIzin,
  getAllJenisIzin,
  getJenisIzinById,
  getJenisIzinByJenis,
  getJenisIzinByTahun,
  getJenisIzinByTahunAndJenis,
  insertJenisIzin,
  updateJenisIzin
} from "./jenisIzin.repository.js";

export const GetAllJenisIzin = async () => {
  const data = await getAllJenisIzin();
  return data;
};

export const GetJenisById = async (id) => {
  const data = await getJenisIzinById(id);
  return data;
};

export const GetAllJenisIzinByTahun = async (tahun) => {
  const data = await getJenisIzinByTahun(tahun);
  return data;
};

export const GetAllJenisIzinByJenis = async (jenis) => {
  const data = await getJenisIzinByJenis(jenis);
  return data;
};

export const GetAllJenisIzinByTahunAndJenis = async (tahun, jenis) => {
  const data = await getJenisIzinByTahunAndJenis(tahun, jenis);
  return data;
};

export const CreateJenisIzin = async (data) => {
  const create = await insertJenisIzin(data);
  return create;
};

export const UpdateJenisIzin = async (id, data) => {
  const update = await updateJenisIzin(id, data);
  return update;
};

export const DeleteJenisIzin = async (id) => {
  const destroy = await deleteJenisIzin(id);
  return destroy;
};
