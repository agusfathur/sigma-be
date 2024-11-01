import { prisma } from "../utils/prisma.js";

export const createSlipGajiDetailPajak = async (data) => {
  return await prisma.slip_gaji_detail_pajak.create({
    data
  });
};

export const getSlipGajiDetailPajak = async (filter = {}) => {
  return await prisma.slip_gaji_detail_pajak.findMany({
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getSlipGajiDetailPajakByPegawaiBulanTahun = async (pegawai_id, bulan, tahun) => {
  return await prisma.slip_gaji_detail_pajak.findMany({
    where: {
      slip_gaji: {
        pegawai_id: pegawai_id
      },
      bulan: Number(bulan),
      tahun: Number(tahun)
    }
  });
};
export const getSlipGajiDetailPajakById = async (id) => {
  return await prisma.slip_gaji_detail_pajak.findUnique({
    where: {
      id_slip_gaji_detail_pajak: id
    }
  });
};

export const updateSlipGajiDetailPajak = async (id, data) => {
  return await prisma.slip_gaji_detail_pajak.update({
    where: {
      id_slip_gaji_detail_pajak: id
    },
    data
  });
};

export const deleteSlipGajiDetailPajak = async (id) => {
  return await prisma.slip_gaji_detail_pajak.delete({
    where: {
      id_slip_gaji_detail_pajak: id
    }
  });
};
