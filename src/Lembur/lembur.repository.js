import { prisma } from "../utils/prisma.js";

export const getAllLembur = async (filter = {}) => {
  return await prisma.lembur.findMany({
    include: {
      absensi: {
        include: {
          pegawai: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const getLemburById = async (id) => {
  return await prisma.lembur.findUnique({
    where: {
      id_lembur: id
    },
    include: {
      absensi: {
        include: {
          pegawai: true
        }
      }
    }
  });
};

export const insertLembur = async (data) => {
  return await prisma.lembur.create({
    data
  });
};

export const updateLembur = async (id, data) => {
  return await prisma.lembur.update({
    where: {
      id_lembur: id
    },
    data
  });
};

export const destroyLembur = async (id) => {
  return await prisma.lembur.delete({
    where: {
      id_lembur: id
    }
  });
};
