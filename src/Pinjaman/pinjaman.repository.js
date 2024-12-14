import { prisma } from "../utils/prisma.js";

export const getAllPinjaman = async (filter = {}) => {
  return await prisma.pinjaman.findMany({
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const getPinjamanById = async (id) => {
  return await prisma.pinjaman.findUnique({
    where: {
      id_pinjaman: id
    },
    include: {
      pegawai: true
    }
  });
};

export const getAllPinjamanByPegawai = async (id, filter = {}) => {
  return await prisma.pinjaman.findMany({
    where: { pegawai_id: id, ...filter },
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const insertPinjaman = async (data) => {
  return await prisma.pinjaman.create({
    data
  });
};

export const updatePinjamanById = async (id, data) => {
  return await prisma.pinjaman.update({
    where: {
      id_pinjaman: id
    },
    data
  });
};

export const destroyPinjamanById = async (id) => {
  return await prisma.pinjaman.delete({
    where: {
      id_pinjaman: id
    }
  });
};
