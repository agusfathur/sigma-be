import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailBonus = async (data) => {
  return await prisma.slip_gaji_detail_bonus.create({
    data
  });
};

export const getSlipGajiDetailBonus = async (filter = {}) => {
  return await prisma.slip_gaji_detail_bonus.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailBonusByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_bonus.findMany({
    where: {
      slip_gaji: {
        pegawai_id: pegawai_id
      },
      bulan: Number(bulan),
      tahun: Number(tahun)
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailBonusById = async (id) => {
  return await prisma.slip_gaji_detail_bonus.findUnique({
    where: {
      id_slip_gaji_detail_bonus: id
    }
  });
};

export const updateSlipGajiDetailBonus = async (id, data) => {
  return await prisma.slip_gaji_detail_bonus.update({
    where: {
      id_slip_gaji_detail_bonus: id
    },
    data
  });
};

export const deleteSlipGajiDetailBonus = async (id) => {
  return await prisma.slip_gaji_detail_bonus.delete({
    where: {
      id_slip_gaji_detail_bonus: id
    }
  });
};
