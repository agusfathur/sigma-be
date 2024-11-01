import { prisma } from "../utils/prisma.js";

export const getTunjanganTetap = async () => {
  return await prisma.tunjangan_tetap.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getTunjanganTetapById = async (id) => {
  return await prisma.tunjangan_tetap.findUnique({
    where: {
      id_tunjangan_tetap: id
    }
  });
};

export const insertTunjanganTetap = async (data) => {
  return await prisma.tunjangan_tetap.create({
    data
  });
};

export const updateTunjanganTetap = async (id, data) => {
  return await prisma.tunjangan_tetap.update({
    where: {
      id_tunjangan_tetap: id
    },
    data
  });
};

export const destroyTunjanganTetap = async (id) => {
  return await prisma.tunjangan_tetap.delete({
    where: {
      id_tunjangan_tetap: id
    }
  });
};
