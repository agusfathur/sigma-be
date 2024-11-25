import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailKehadiran = async (data) => {
  return await prisma.slip_gaji_detail_kehadiran.create({
    data
  });
};

export const getSlipGajiDetailKehadiran = async (filter = {}) => {
  return await prisma.slip_gaji_detail_kehadiran.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailKehadiranByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_kehadiran.findMany({
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

export const getSlipGajiDetailKehadiranById = async (id) => {
  return await prisma.slip_gaji_detail_kehadiran.findUnique({
    where: {
      id_slip_gaji_detail_kehadiran: id
    }
  });
};

export const updateSlipGajiDetailKehadiran = async (id, data) => {
  return await prisma.slip_gaji_detail_kehadiran.update({
    where: {
      id_slip_gaji_detail_kehadiran: id
    },
    data
  });
};

export const deleteSlipGajiDetailKehadiran = async (id) => {
  return await prisma.slip_gaji_detail_kehadiran.delete({
    where: {
      id_slip_gaji_detail_kehadiran: id
    }
  });
};
