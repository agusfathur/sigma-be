import { deleteSettingGaji, getSettingGaji, insertSettingGaji, updateSettingGaji } from "./settingGaji.repository.js";

export const GetSettingGaji = async () => {
  const data = await getSettingGaji();
  return data;
};

export const CreateSettingGaji = async (data) => {
  const create = await insertSettingGaji(data);
  return create;
};

export const UpdateSettingGaji = async (id, data) => {
  const update = await updateSettingGaji(id, data);
  return update;
};

export const DeleteSettingGaji = async (id) => {
  const deleteData = await deleteSettingGaji(id);
  return deleteData;
};
