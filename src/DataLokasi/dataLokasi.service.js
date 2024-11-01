import {
  createDataLokasi,
  destroyDataLokasi,
  getDataLokasi,
  getDataLokasiById,
  updateDataLokasi
} from "./dataLokasi.repository.js";

export const GetAllDataLokasi = async () => {
  const data = await getDataLokasi();
  return data;
};

export const GetDataLokasiById = async (id) => {
  const data = await getDataLokasiById(id);
  return data;
};

export const CreateDataLokasi = async (data) => {
  const newData = await createDataLokasi(data);
  return newData;
};

export const UpdateDataLokasi = async (id, data) => {
  const updatedData = await updateDataLokasi(id, data);
  return updatedData;
};

export const DeleteDataLokasi = async (id) => {
  const deletedData = await destroyDataLokasi(id);
  return deletedData;
};
