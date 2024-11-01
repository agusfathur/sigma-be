import { prisma } from "../utils/prisma.js";

export const getAllLibur = async (filter = {}) => {
  return await prisma.data_libur.findMany({
    include: {
      kategori_libur: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const getLiburById = async (id) => {
  return await prisma.data_libur.findUnique({
    where: {
      id_libur: id
    },
    include: {
      kategori_libur: true
    }
  });
};

export const getDataLiburByDate = async (date) => {
  return await prisma.data_libur.findFirst({
    where: {
      tanggal: date
    }
  });
};

export const insertLibur = async (data) => {
  return await prisma.data_libur.create({
    data
  });
};

export const updateLibur = async (id, data) => {
  return await prisma.data_libur.update({
    where: {
      id_libur: id
    },
    data
  });
};

export const destroyLibur = async (id) => {
  return await prisma.data_libur.delete({
    where: {
      id_libur: id
    }
  });
};
