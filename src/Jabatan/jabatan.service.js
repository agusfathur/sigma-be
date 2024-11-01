import {
  destroyJabatanById,
  getAllJabatan,
  getJabatanById,
  insertJabatan,
  updateJabatanById
} from "./jabatan.repository.js";

export const GetAllJabatan = async () => {
  const data = await getAllJabatan();
  return data;
};

export const GetJabatanById = async (id) => {
  const data = await getJabatanById(id);
  return data;
};
export const CreateJabatan = async (data) => {
  const create = await insertJabatan(data);
  return create;
};
export const UpdateJabatan = async (id, data) => {
  const update = await updateJabatanById(id, data);
  return update;
};

export const DeleteJabatan = async (id) => {
  const data = await destroyJabatanById(id);
  return data;
};
