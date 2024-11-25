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
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllTunjanganBonus({
    pegawai_id,
    tanggal: { gte: firstDay, lte: lastDay }
  });

  return data;
};
export const GetTunjanganBonusByTahun = async (tahun) => {
  const start = new Date(`${tahun}-01-01`);
  const end = new Date(`${tahun}-12-31`);
  const data = await getAllTunjanganBonus({
    tanggal: { gte: start, lte: end }
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
