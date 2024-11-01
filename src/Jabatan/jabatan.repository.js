import { prisma } from "../utils/prisma.js";

export const getAllJabatan = async () => {
  return await prisma.jabatan.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getJabatanById = async (id) => {
  return await prisma.jabatan.findUnique({
    where: {
      id_jabatan: id
    }
  });
};

export const insertJabatan = async (data) => {
  return await prisma.jabatan.create({
    data
  });
};
export const updateJabatanById = async (id, data) => {
  return await prisma.jabatan.update({
    where: {
      id_jabatan: id
    },
    data
  });
};

export const destroyJabatanById = async (id) => {
  return await prisma.jabatan.delete({
    where: {
      id_jabatan: id
    }
  });
};
