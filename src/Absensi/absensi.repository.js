import { prisma } from "../utils/prisma.js";

export const getAllAbsensi = async (filter = {}) => {
  return await prisma.absensi.findMany({
    include: {
      pegawai: true,
      jadwal_pegawai: true
    },
    where: filter,
    orderBy: {
      tanggal_absen: "desc"
    }
  });
};

export const getCountAbsensi = async (filter = {}) => {
  return await prisma.absensi.count({
    where: filter
  });
};

export const getAbsensiById = async (id) => {
  return await prisma.absensi.findUnique({
    where: {
      id_absen: id
    },
    include: {
      pegawai: true,
      jadwal_pegawai: true
    }
  });
};

export const insertAbsensi = async (data) => {
  return await prisma.absensi.create({
    data
  });
};

export const updateAbsensi = async (id, data) => {
  return await prisma.absensi.update({
    where: {
      id_absen: id
    },
    data
  });
};

export const destroyAbsensi = async (id) => {
  return await prisma.absensi.delete({
    where: {
      id_absen: id
    }
  });
};
