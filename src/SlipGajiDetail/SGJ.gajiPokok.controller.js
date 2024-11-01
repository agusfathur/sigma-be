import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailGajiPokok = async (data) => {
  return await prisma.slip_gaji_detail_gaji_pokok.create({
    data
  });
};

export const getSlipGajiDetailGajiPokok = async (filter = {}) => {
  return await prisma.slip_gaji_detail_gaji_pokok.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailGajiPokokbyBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_gaji_pokok.findFirst({
    where: {
      slip_gaji: {
        pegawai_id: pegawai_id
      },
      bulan: Number(bulan),
      tahun: Number(tahun)
    }
  });
};

export const getSlipGajiDetailGajiPokokById = async (id) => {
  return await prisma.slip_gaji_detail_gaji_pokok.findUnique({
    where: {
      id_slip_gaji_detail_gaji_pokok: id
    }
  });
};

export const updateSlipGajiDetailGajiPokok = async (id, data) => {
  return await prisma.slip_gaji_detail_gaji_pokok.update({
    where: {
      id_slip_gaji_detail_gaji_pokok: id
    },
    data
  });
};

export const deleteSlipGajiDetailGajiPokok = async (id) => {
  return await prisma.slip_gaji_detail_gaji_pokok.delete({
    where: {
      id_slip_gaji_detail_gaji_pokok: id
    }
  });
};
