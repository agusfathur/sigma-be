import {
  destroyJabatanFungsionalByIdData,
  getAllJabatanFungsionalData,
  getJabatanFungsionalByIdData,
  insertJabatanFungsionalData,
  updateJabatanFungsionalData
} from "./jabatanFungsional.repository.js";

export const GetAllJabatanFungsional = async () => {
  const data = await getAllJabatanFungsionalData();
  return data;
};

export const GetJabatanFungsionalById = async (id) => {
  const data = await getJabatanFungsionalByIdData(id);
  return data;
};

export const CreateJabatanFungsional = async (data) => {
  const create = await insertJabatanFungsionalData(data);
  return create;
};

export const UpdateJabatanFungsional = async (id, data) => {
  const update = await updateJabatanFungsionalData(id, data);
  return update;
};

export const DeleteJabatanFungsional = async (id) => {
  const data = await destroyJabatanFungsionalByIdData(id);
  return data;
};
