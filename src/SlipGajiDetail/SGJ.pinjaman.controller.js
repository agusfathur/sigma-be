import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailPinjaman = async (data) => {
  return await prisma.slip_gaji_detail_pinjaman.create({
    data
  });
};

export const getSlipGajiDetailPinjaman = async (filter = {}) => {
  return await prisma.slip_gaji_detail_pinjaman.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailPinjamanByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_pinjaman.findMany({
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

export const updateSlipGajiDetailPinjaman = async (id, data) => {
  return await prisma.slip_gaji_detail_pinjaman.update({
    where: {
      id_slip_gaji_detail_pinjaman: id
    },
    data
  });
};

export const deleteSlipGajiDetailPinjaman = async (id) => {
  return await prisma.slip_gaji_detail_pinjaman.delete({
    where: {
      id_slip_gaji_detail_pinjaman: id
    }
  });
};
