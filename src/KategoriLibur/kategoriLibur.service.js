import {
  destroyKategoriLibur,
  getAllKategoriLibur,
  getKategoriLiburById,
  insertKategoriLibur,
  updateKategoriLibur
} from "./kategoriLibur.repository.js";

export const GetAllKategoriLibur = async () => {
  const getData = await getAllKategoriLibur();
  return getData;
};

export const GetKategoriLiburById = async (id) => {
  const getData = await getKategoriLiburById(id);
  return getData;
};

export const CreateKategoriLibur = async (data) => {
  const create = await insertKategoriLibur(data);
  return create;
};

export const UpdateKategoriLibur = async (id, data) => {
  const update = await updateKategoriLibur(id, data);
  if (!update) throw Error("Kategori Libur not updated");
  return update;
};

export const DeleteKategoriLibur = async (id) => {
  const destroy = await destroyKategoriLibur(id);
  return destroy;
};
