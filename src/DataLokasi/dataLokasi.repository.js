import { prisma } from "../utils/prisma.js";

export const getDataLokasi = async () => {
  return await prisma.data_lokasi.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getDataLokasiById = async (id) => {
  return await prisma.data_lokasi.findUnique({
    where: {
      id_lokasi: id
    }
  });
};

export const createDataLokasi = async (data) => {
  return await prisma.data_lokasi.create({
    data
  });
};

export const updateDataLokasi = async (id, data) => {
  return await prisma.data_lokasi.update({
    where: {
      id_lokasi: id
    },
    data
  });
};

export const destroyDataLokasi = async (id) => {
  return await prisma.data_lokasi.delete({
    where: {
      id_lokasi: id
    }
  });
};
