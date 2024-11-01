import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailLembur = async (data) => {
  return await prisma.slip_gaji_detail_lembur.create({
    data
  });
};

export const getSlipGajiDetailLembur = async (filter = {}) => {
  return await prisma.slip_gaji_detail_lembur.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailLemburByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_lembur.findMany({
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

export const getSlipGajiDetailLemburById = async (id) => {
  return await prisma.slip_gaji_detail_lembur.findUnique({
    where: {
      id_slip_gaji_detail_lembur: id
    }
  });
};

export const updateSlipGajiDetailLembur = async (id, data) => {
  return await prisma.slip_gaji_detail_lembur.update({
    where: {
      id_slip_gaji_detail_lembur: id
    },
    data
  });
};

export const deleteSlipGajiDetailLembur = async (id) => {
  return await prisma.slip_gaji_detail_lembur.delete({
    where: {
      id_slip_gaji_detail_lembur: id
    }
  });
};
