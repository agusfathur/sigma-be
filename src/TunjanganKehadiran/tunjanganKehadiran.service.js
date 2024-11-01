import {
  destroyTunjanganKehadiran,
  getTunjanganKehadiran,
  getTunjanganKehadiranById,
  insertTunjanganKehadiran,
  updateTunjanganKehadiran
} from "./tunjanganKehadiran.repository.js";

export const GetAllTunjanganKehadiran = async () => {
  const data = await getTunjanganKehadiran();
  return data;
};

export const GetTunjanganKehadiranById = async (id) => {
  const data = await getTunjanganKehadiranById(id);
  return data;
};

export const CreateTunjanganKehadiran = async (data) => {
  const create = await insertTunjanganKehadiran(data);
  return create;
};

export const UpdateTunjanganKehadiran = async (id, data) => {
  const update = await updateTunjanganKehadiran(id, data);
  return update;
};

export const DeleteTunjanganKehadiran = async (id) => {
  const destroy = await destroyTunjanganKehadiran(id);
  return destroy;
};
