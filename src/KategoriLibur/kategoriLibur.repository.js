import { prisma } from "../utils/prisma.js";

export const getAllKategoriLibur = async () => {
  return await prisma.kategori_libur.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getKategoriLiburById = async (id) => {
  return await prisma.kategori_libur.findUnique({
    where: {
      id_kategori_libur: id
    }
  });
};

export const insertKategoriLibur = async (data) => {
  return await prisma.kategori_libur.create({
    data
  });
};

export const updateKategoriLibur = async (id, data) => {
  return await prisma.kategori_libur.update({
    where: {
      id_kategori_libur: id
    },
    data
  });
};

export const destroyKategoriLibur = async (id) => {
  return await prisma.kategori_libur.delete({
    where: {
      id_kategori_libur: id
    }
  });
};
