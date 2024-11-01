import { prisma } from "../utils/prisma.js";

export const getAllSlipGaji = async (filter = {}) => {
  return await prisma.slip_gaji.findMany({
    include: {
      pegawai: true,
      pembayaran_gaji: true,
      slip_gaji_detail_gaji_pokok: true,
      slip_gaji_detail_kehadiran: true,
      slip_gaji_detail_tetap: true,
      slip_gaji_detail_fungsional: true,
      slip_gaji_detai_pajak: true,
      slip_gaji_detai_potong_gaji: true,
      slip_gaji_detail_bonus: true,
      slip_gaji_detail_lembur: true,
      slip_gaji_detail_pinjaman: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const insertSlipGaji = async (data) => {
  return await prisma.slip_gaji.create({
    data
  });
};

export const insertManySlipGaji = async (data) => {
  return await prisma.slip_gaji.createMany({
    data
  });
};

export const updateSlipGaji = async (id, data) => {
  return await prisma.slip_gaji.update({
    where: {
      id_slip_gaji: id
    },
    data
  });
};

export const getSlipGajiById = async (id) => {
  return await prisma.slip_gaji.findUnique({
    where: {
      id_slip_gaji: id
    },
    include: {
      pegawai: true,
      pembayaran_gaji: true,
      slip_gaji_detail_gaji_pokok: true,
      slip_gaji_detail_kehadiran: true,
      slip_gaji_detail_tetap: true,
      slip_gaji_detail_fungsional: true,
      slip_gaji_detai_pajak: true,
      slip_gaji_detai_potong_gaji: true,
      slip_gaji_detail_bonus: true,
      slip_gaji_detail_lembur: true,
      slip_gaji_detail_pinjaman: true
    }
  });
};

export const deleteSlipGaji = async (id) => {
  return await prisma.slip_gaji.delete({
    where: {
      id_slip_gaji: id
    }
  });
};
