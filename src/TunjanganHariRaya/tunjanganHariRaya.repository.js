import { prisma } from "../utils/prisma.js";

export const getAllTHR = async (filter = {}) => {
  return await prisma.tunjangan_hari_raya.findMany({
    include: {
      pegawai: true
    },
    orderBy: {
      tahun: "desc"
    },
    where: filter
  });
};

export const getTHRById = async (id) => {
  return await prisma.tunjangan_hari_raya.findUnique({
    where: {
      id_thr: id
    },
    include: {
      pegawai: true
    }
  });
};

export const getAllTHRByPegawai = async (id) => {
  return await prisma.tunjangan_hari_raya.findMany({
    where: {
      pegawai_id: id
    },
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const insertTHR = async (data) => {
  return await prisma.tunjangan_hari_raya.create({
    data
  });
};

export const updateTHRById = async (id, data) => {
  return await prisma.tunjangan_hari_raya.update({
    where: {
      id_thr: id
    },
    data
  });
};

export const destroyTHRById = async (id) => {
  return await prisma.tunjangan_hari_raya.delete({
    where: {
      id_thr: id
    }
  });
};
