import { prisma } from "../utils/prisma.js";

export const getAllTunjanganBonus = async (filter = {}) => {
  return await prisma.tunjangan_bonus.findMany({
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const getAllTunjanganBonusByCreatedAt = async (tanggalDari, tanggalSampai) => {
  return await prisma.tunjangan_bonus.findMany({
    where: {
      createdAt: {
        gte: tanggalDari,
        lte: tanggalSampai
      }
    },
    include: {
      pegawai: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getTunjanganBonusById = async (id) => {
  return await prisma.tunjangan_bonus.findUnique({
    where: {
      id_tunjangan_bonus: id
    },
    include: {
      pegawai: true
    }
  });
};

export const getTunjanganBonusByPegawaiId = async (id) => {
  return await prisma.tunjangan_bonus.findMany({
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

export const createTunjanganBonus = async (data) => {
  return await prisma.tunjangan_bonus.create({
    data
  });
};

export const updateTunjanganBonus = async (id, data) => {
  return await prisma.tunjangan_bonus.update({
    where: {
      id_tunjangan_bonus: id
    },
    data
  });
};

export const destroyTunjanganBonus = async (id) => {
  return await prisma.tunjangan_bonus.delete({
    where: {
      id_tunjangan_bonus: id
    }
  });
};
