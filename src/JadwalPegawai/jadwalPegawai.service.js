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
