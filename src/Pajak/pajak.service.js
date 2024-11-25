import { destroyPajakById, getAllPajak, getPajakById, insertPajak, updatePajak } from "./pajak.repository.js";

export const GetAllPajak = async () => {
  const data = await getAllPajak();
  return data;
};

export const GetPajakById = async (id) => {
  const data = await getPajakById(id);
  return data;
};

export const CreatePajak = async (data) => {
  const create = await insertPajak(data);
  return create;
};

export const UpdatePajak = async (id, data) => {
  const update = await updatePajak(id, data);
  return update;
};

export const DeletePajak = async (id) => {
  const destroy = await destroyPajakById(id);
  return destroy;
};
