import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailFungsional = async (data) => {
  return await prisma.slip_gaji_detail_fungsional.create({
    data
  });
};

export const getSlipGajiDetailFungsional = async (filter = {}) => {
  return await prisma.slip_gaji_detail_fungsional.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailFungsionalByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_fungsional.findMany({
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

export const getSlipGajiDetailFungsionalById = async (id) => {
  return await prisma.slip_gaji_detail_fungsional.findUnique({
    where: {
      id_slip_gaji_detail_fungsional: id
    }
  });
};

export const updateSlipGajiDetailFungsional = async (id, data) => {
  return await prisma.slip_gaji_detail_fungsional.update({
    where: {
      id_slip_gaji_detail_fungsional: id
    },
    data
  });
};

export const deleteSlipGajiDetailFungsional = async (id) => {
  return await prisma.slip_gaji_detail_fungsional.delete({
    where: {
      id_slip_gaji_detail_fungsional: id
    }
  });
};
