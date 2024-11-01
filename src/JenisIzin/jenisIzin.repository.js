import { prisma } from "../utils/prisma.js";

export const getAllJenisIzin = async () => {
  return await prisma.jenis_izin.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getJenisIzinById = async (id) => {
  return await prisma.jenis_izin.findUnique({
    where: {
      id_jenis_izin: id
    }
  });
};

export const getJenisIzinByJenis = async (jenis) => {
  return await prisma.jenis_izin.findMany({
    where: {
      jenis: jenis
    }
  });
};
export const getJenisIzinByTahun = async (tahun) => {
  return await prisma.jenis_izin.findMany({
    where: {
      tahun: Number(tahun)
    }
  });
};

export const getJenisIzinByTahunAndJenis = async (tahun, jenis) => {
  return await prisma.jenis_izin.findMany({
    where: {
      tahun: Number(tahun),
      jenis: jenis
    }
  });
};

export const insertJenisIzin = async (data) => {
  return await prisma.jenis_izin.create({
    data
  });
};

export const updateJenisIzin = async (id, data) => {
  return await prisma.jenis_izin.update({
    where: {
      id_jenis_izin: id
    },
    data
  });
};

export const deleteJenisIzin = async (id) => {
  return await prisma.jenis_izin.delete({
    where: {
      id_jenis_izin: id
    }
  });
};
