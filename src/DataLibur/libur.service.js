import { destroyLibur, getAllLibur, getLiburById, insertLibur, updateLibur } from "./libur.repository.js";

export const GetAllLibur = async () => {
  const getData = await getAllLibur();
  return getData;
};

export const GetLiburById = async (id) => {
  const getData = await getLiburById(id);
  return getData;
};

export const CreateLibur = async (data) => {
  const create = await insertLibur(data);
  return create;
};

export const UpdateLibur = async (id, data) => {
  const update = await updateLibur(id, data);
  return update;
};

export const DeleteLibur = async (id) => {
  const destroy = await destroyLibur(id);
  return destroy;
};
