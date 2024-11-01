import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailPotongGaji = async (data) => {
  return await prisma.slip_gaji_detail_potong_gaji.create({
    data
  });
};

export const getSlipGajiDetailPotongGaji = async (filter = {}) => {
  return await prisma.slip_gaji_detail_potong_gaji.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailPotongGajiByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_potong_gaji.findMany({
    where: {
      slip_gaji: {
        pegawai_id: pegawai_id
      },
      bulan: Number(bulan),
      tahun: Number(tahun)
    }
  });
};
export const updateSlipGajiDetailPotongGaji = async (id, data) => {
  return await prisma.slip_gaji_detail_potong_gaji.update({
    where: {
      id_slip_gaji_detail_potong_gaji: id
    },
    data
  });
};

export const deleteSlipGajiDetailPotongGaji = async (id) => {
  return await prisma.slip_gaji_detail_potong_gaji.delete({
    where: {
      id_slip_gaji_detail_potong_gaji: id
    }
  });
};
