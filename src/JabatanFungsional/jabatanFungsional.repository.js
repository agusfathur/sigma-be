import { prisma } from "../utils/prisma.js";

export const getAllJabatanFungsionalData = async () => {
  return await prisma.jabatan_fungsional.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getJabatanFungsionalByIdData = async (id) => {
  return await prisma.jabatan_fungsional.findUnique({
    where: {
      id_jabatan_fungsional: id
    }
  });
};

export const insertJabatanFungsionalData = async (data) => {
  return await prisma.jabatan_fungsional.create({ data });
};

export const updateJabatanFungsionalData = async (id, data) => {
  return await prisma.jabatan_fungsional.update({
    where: {
      id_jabatan_fungsional: id
    },
    data
  });
};

export const destroyJabatanFungsionalByIdData = async (id) => {
  return await prisma.jabatan_fungsional.delete({
    where: {
      id_jabatan_fungsional: id
    }
  });
};
