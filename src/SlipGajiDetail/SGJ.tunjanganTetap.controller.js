import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailTetap = async (data) => {
  return await prisma.slip_gaji_detail_tetap.create({
    data
  });
};

export const getSlipGajiDetailTetap = async (filter = {}) => {
  return await prisma.slip_gaji_detail_tetap.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailTjTetapByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_tetap.findMany({
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

export const updateSlipGajiDetailTetap = async (id, data) => {
  return await prisma.slip_gaji_detail_tetap.update({
    where: {
      id_slip_gaji_detail_tetap: id
    },
    data
  });
};

export const deleteSlipGajiDetailTetap = async (id) => {
  return await prisma.slip_gaji_detail_tetap.delete({
    where: {
      id_slip_gaji_detail_tetap: id
    }
  });
};

export const deleteManySlipGajiDetailTetap = async (ids) => {
  return await prisma.slip_gaji_detail_tetap.deleteMany({
    where: {
      id_slip_gaji_detail_tetap: {
        in: ids
      }
    }
  });
};
