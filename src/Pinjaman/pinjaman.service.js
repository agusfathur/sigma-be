import {
  destroyPinjamanById,
  getAllPinjaman,
  getAllPinjamanByPegawai,
  getPinjamanById,
  insertPinjaman,
  updatePinjamanById
} from "./pinjaman.repository.js";

export const GetAllPinjaman = async () => {
  const data = await getAllPinjaman();
  return data;
};

export const GetAllPinjamanByPegawai = async (pegawaiId) => {
  const data = await getAllPinjamanByPegawai(pegawaiId);
  return data;
};

export const GetPinjamanPegawaibyTahunBulan = async (pegawai_id, bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllPinjaman({
    pegawai_id,
    tanggal: { gte: firstDay, lte: lastDay },
    OR: [
      {
        status_pinjaman: {
          in: ["diterima"]
        }
      }
    ]
  });
  return data;
};

export const GetPinjamanById = async (id) => {
  const data = await getPinjamanById(id);
  return data;
};

export const GetPinjamanByBulanTahun = async (bulan, tahun) => {
  const firstDay = new Date(tahun, bulan - 1, 1);
  const lastDay = new Date(tahun, bulan, 0, 23, 59, 59);
  const data = await getAllPinjaman({ tanggal: { gte: firstDay, lte: lastDay } });
  return data;
};

export const GetPinjamanBytanggal = async (tanggal) => {
  const data = await getAllPinjaman({ tanggal: tanggal + "T00:00:00.000Z" });
  return data;
};

export const CreatePinjaman = async (data) => {
  const insert = await insertPinjaman(data);
  return insert;
};

export const UpdatePinjamanById = async (id, data) => {
  const update = await updatePinjamanById(id, data);
  return update;
};

export const UpdateStatusPinjamanById = async (id, data) => {
  const update = await updatePinjamanById(id, {
    status_pinjaman: data
  });
  return update;
};

export const DeletePinjamanById = async (id) => {
  const destroy = await destroyPinjamanById(id);
  return destroy;
};
