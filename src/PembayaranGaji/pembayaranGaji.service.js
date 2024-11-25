import { updateSlipGaji } from "../SlipGaji/slipGaJi.repository.js";
import {
  deletePembayaranGaji,
  getAllPembayaranGaji,
  getPembayaranGajiById,
  getPembayaranGajiBySlipGajiId,
  insertPembayaranGaji,
  updatePembayaranGaji
} from "./pembayaranGaji.repository.js";
export const GetAllPembayaranGaji = async () => {
  const data = await getAllPembayaranGaji();
  return data;
};

export const GetPembayaranGajiById = async (id) => {
  const data = await getPembayaranGajiById(id);
  return data;
};

export const GetPembayaranGajiBySlipGajiId = async (id) => {
  const data = await getPembayaranGajiBySlipGajiId(id);
  return data;
};

export const CreatePembayaranGaji = async (data) => {
  console.log("from creat gaji", { data });
  const insert = await insertPembayaranGaji(data);
  console.log({ insert });
  await updateSlipGaji(insert.slip_gaji_id, {
    status_pembayaran: "dibayar"
  });
  return insert;
};

export const UpdatePembayaranGaji = async (id, data) => {
  const update = await updatePembayaranGaji(id, data);
  return update;
};

export const DeletePembayaranGaji = async (id) => {
  const deleteData = await deletePembayaranGaji(id);
  return deleteData;
};
