import {
  destroyTunjanganTetap,
  getTunjanganTetap,
  getTunjanganTetapById,
  insertTunjanganTetap,
  updateTunjanganTetap
} from "./tunjanganTetap.repository.js";

export const GetAllTunjanganTetap = async () => {
  const data = await getTunjanganTetap();
  return data;
};

export const GetTunjanganTetapById = async (id) => {
  const data = await getTunjanganTetapById(id);
  return data;
};

export const CreateTunjanganTetap = async (data) => {
  const create = await insertTunjanganTetap(data);
  return create;
};

export const UpdateTunjanganTetap = async (id, data) => {
  const update = await updateTunjanganTetap(id, data);
  return update;
};

export const DeleteTunjanganTetap = async (id) => {
  const destroy = await destroyTunjanganTetap(id);
  return destroy;
};
