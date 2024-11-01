import {
  createTunjanganBonus,
  destroyTunjanganBonus,
  getAllTunjanganBonus,
  getAllTunjanganBonusByCreatedAt,
  getTunjanganBonusById,
  getTunjanganBonusByPegawaiId,
  updateTunjanganBonus
} from "./tunjanganBonus.repository.js";

export const GetAllTunjanganBonus = async () => {
  const data = await getAllTunjanganBonus();
  return data;
};

export const GetAllTunjanganBonusByCreatedAt = async (tanggalDari, tanggalSampai) => {
  const startDate = new Date(tanggalDari);
  const endDate = new Date(tanggalSampai);
  endDate.setDate(endDate.getDate() + 1);
  const data = await getAllTunjanganBonusByCreatedAt(startDate, endDate);
  return data;
};

export const GetAllTunjanganBonusByBulanTahunPegawai = async (pegawai_id, bulan, tahun) => {
  let date = new Date(`${tahun}-${bulan}`);
  let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const data = await getAllTunjanganBonus({
    pegawai_id,
    tanggal: { gte: firstDay, lte: lastDay }
  });
  return data;
};

export const GetTunjanganBonusById = async (id) => {
  const data = await getTunjanganBonusById(id);
  return data;
};

export const GetTunjanganBonusByPegawaiId = async (id) => {
  const data = await getTunjanganBonusByPegawaiId(id);
  return data;
};

export const CreateTunjanganBonus = async (data) => {
  const create = await createTunjanganBonus(data);
  return create;
};

export const UpdateTunjanganBonus = async (id, data) => {
  const update = await updateTunjanganBonus(id, data);
  return update;
};

export const DestroyTunjanganBonus = async (id) => {
  const destroy = await destroyTunjanganBonus(id);
  return destroy;
};
