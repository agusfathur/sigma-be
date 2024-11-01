import { prisma } from "../utils/prisma.js";

export const getAllPajak = async () => {
  return await prisma.pajak.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getPajakById = async (id) => {
  return await prisma.pajak.findUnique({
    where: {
      id_pajak: id
    }
  });
};

export const insertPajak = async (data) => {
  return await prisma.pajak.create({
    data
  });
};

export const updatePajak = async (id, data) => {
  return await prisma.pajak.update({
    where: {
      id_pajak: id
    },
    data
  });
};

export const destroyPajakById = async (id) => {
  return await prisma.pajak.delete({
    where: {
      id_pajak: id
    }
  });
};
