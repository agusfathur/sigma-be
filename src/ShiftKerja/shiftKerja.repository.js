import { prisma } from "../utils/prisma.js";

export const getShiftKerja = async () => {
  return await prisma.shift_kerja.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getShiftKerjaById = async (id) => {
  return await prisma.shift_kerja.findUnique({
    where: {
      id_shift_kerja: id
    }
  });
};

export const insertShiftKerja = async (data) => {
  return await prisma.shift_kerja.create({
    data
  });
};

export const updateShiftKerja = async (id, data) => {
  return await prisma.shift_kerja.update({
    where: {
      id_shift_kerja: id
    },
    data
  });
};

export const destroyShiftKerjaById = async (id) => {
  return await prisma.shift_kerja.delete({
    where: {
      id_shift_kerja: id
    }
  });
};
