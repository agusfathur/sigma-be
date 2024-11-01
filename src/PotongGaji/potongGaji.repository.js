import { prisma } from "../utils/prisma.js";

export const getAllPotongGaji = async (filter = {}) => {
  return await prisma.potong_gaji.findMany({
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const getPotongGajiById = async (id) => {
  return await prisma.potong_gaji.findUnique({
    where: {
      id_potong_gaji: id
    },
    include: {
      pegawai: true
    }
  });
};

export const getAllPotongGajiByPegawai = async (id) => {
  return await prisma.potong_gaji.findMany({
    where: {
      pegawai_id: id
    },
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const insertPotongGaji = async (data) => {
  return await prisma.potong_gaji.create({
    data
  });
};

export const updatePotongGajiById = async (id, data) => {
  return await prisma.potong_gaji.update({
    where: {
      id_potong_gaji: id
    },
    data
  });
};

export const destroyPotongGajiById = async (id) => {
  return await prisma.potong_gaji.delete({
    where: {
      id_potong_gaji: id
    }
  });
};
