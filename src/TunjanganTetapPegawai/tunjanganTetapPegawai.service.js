import {
  deleteManyTunjanganTetapPegawai,
  deleteTunjanganTetapPegawai,
  getAllTunjanganTetapPegawai,
  getTunjanganTetapPegawaiById,
  getTunjanganTetapPegawaiByPegawaiId,
  insertManyTunjanganTetapPegawai,
  insertTunjanganTetapPegawai,
  updateManyTunjanganTetapPegawai,
  updateTunjanganTetapPegawai
} from "./tunjanganTetapPegawai.repository.js";

export const GetAllTunjanganTetapPegawai = async () => {
  const data = await getAllTunjanganTetapPegawai();
  return data;
};

export const GetTunjanganTetapPegawaiById = async (id) => {
  const data = await getTunjanganTetapPegawaiByPegawaiId(id);
  return data;
};

export const GetTunjanganTetapPegawaiByPegawaiId = async (id) => {
  const data = await getAllTunjanganTetapPegawai({
    pegawai: {
      id_pegawai: id
    }
  });
  return data;
};

export const CreateTunjanganTetapPegawai = async (data) => {
  const insert = await insertTunjanganTetapPegawai(data);
  return insert;
};

export const CreateManyTunjanganTetapPegawai = async (data) => {
  const insert = await insertManyTunjanganTetapPegawai(data);
  return insert;
};

export const UpdateTunjanganTetapPegawai = async (id, data) => {
  const { id_tunjangan_tetap_pegawai, ...updateData } = data;
  const update = await updateTunjanganTetapPegawai(id, updateData);
  return update;
};

export const UpdateManyTunjanganTetapPegawai = async (id, data) => {
  const update = await updateManyTunjanganTetapPegawai(id, data);
  return update;
};

export const DeleteTunjanganTetapPegawai = async (id) => {
  const deleteData = await deleteTunjanganTetapPegawai(id);
  return deleteData;
};

export const DeleteManyTunjanganTetapPegawai = async (id) => {
  const deleteData = await deleteManyTunjanganTetapPegawai(id);
  return deleteData;
};
