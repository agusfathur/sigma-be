import { prisma } from "../utils/prisma.js";

export const getTunjanganKehadiran = async () => {
  return await prisma.tunjangan_kehadiran.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getTunjanganKehadiranById = async (id) => {
  return await prisma.tunjangan_kehadiran.findUnique({
    where: {
      id_tunjangan_kehadiran: id
    }
  });
};

export const insertTunjanganKehadiran = async (data) => {
  return await prisma.tunjangan_kehadiran.create({
    data
  });
};

export const updateTunjanganKehadiran = async (id, data) => {
  return await prisma.tunjangan_kehadiran.update({
    where: {
      id_tunjangan_kehadiran: id
    },
    data
  });
};

export const destroyTunjanganKehadiran = async (id) => {
  return await prisma.tunjangan_kehadiran.delete({
    where: {
      id_tunjangan_kehadiran: id
    }
  });
};
