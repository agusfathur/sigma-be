import {
  destroyShiftKerjaById,
  getShiftKerja,
  getShiftKerjaById,
  insertShiftKerja,
  updateShiftKerja
} from "./shiftKerja.repository.js";

export const GetAllShiftKerja = async () => {
  const getAll = await getShiftKerja();
  return getAll;
};
export const GetShiftKerjaById = async (id) => {
  const getOne = await getShiftKerjaById(id);
  return getOne;
};
export const CreateShiftKerja = async (data) => {
  const create = await insertShiftKerja(data);
  return create;
};
export const UpdateShiftKerja = async (id, data) => {
  const update = await updateShiftKerja(id, data);
  return update;
};
export const DeleteShiftKerja = async (id) => {
  const destroy = await destroyShiftKerjaById(id);
  return destroy;
};
