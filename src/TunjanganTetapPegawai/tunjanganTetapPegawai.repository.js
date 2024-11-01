import { prisma } from "../utils/prisma.js";

export const getAllTunjanganTetapPegawai = async () => {
  const data = await prisma.tunjangan_tetap_pegawai.findMany({
    include: {
      pegawai: true,
      tunjangan_tetap: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return data;
};

export const getTunjanganTetapPegawaiById = async (id) => {
  const data = await prisma.tunjangan_tetap_pegawai.findUnique({
    where: {
      id_tunjangan_tetap_pegawai: id
    },
    include: {
      pegawai: true,
      tunjangan_tetap: true
    }
  });
  return data;
};

export const insertTunjanganTetapPegawai = async (data) => {
  return await prisma.tunjangan_tetap_pegawai.create({
    data
  });
};

export const insertManyTunjanganTetapPegawai = async (data) => {
  return await prisma.tunjangan_tetap_pegawai.createMany({
    data
  });
};

export const updateTunjanganTetapPegawai = async (id, data) => {
  return await prisma.tunjangan_tetap_pegawai.update({
    where: {
      id_tunjangan_tetap_pegawai: id
    },
    data
  });
};

export const updateManyTunjanganTetapPegawai = async (id, data) => {
  return await prisma.tunjangan_tetap_pegawai.updateMany({
    where: {
      id_tunjangan_tetap_pegawai: id
    },
    data
  });
};

export const deleteTunjanganTetapPegawai = async (id) => {
  return await prisma.tunjangan_tetap_pegawai.delete({
    where: {
      id_tunjangan_tetap_pegawai: id
    }
  });
};

export const deleteManyTunjanganTetapPegawai = async (id) => {
  return await prisma.tunjangan_tetap_pegawai.deleteMany({
    where: {
      id_tunjangan_tetap_pegawai: id
    }
  });
};
