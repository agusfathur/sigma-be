import { prisma } from "../utils/prisma.js";

export const getAllJadwalPegawai = async (filter = {}) => {
  return await prisma.jadwal_pegawai.findMany({
    include: {
      pegawai: true,
      shift_kerja: true
    },
    where: filter
  });
};

export const getJadwalPegawaiById = async (id) => {
  return await prisma.jadwal_pegawai.findUnique({
    where: {
      id_jadwal: id
    },
    include: {
      pegawai: true,
      shift_kerja: true
    }
  });
};

export const getAllJadwalPegawaiByPegawai = async (id) => {
  return await prisma.jadwal_pegawai.findMany({
    where: {
      pegawai_id: id
    },
    include: {
      pegawai: true,
      shift_kerja: true
    }
  });
};

export const insertJadwalPegawai = async (data) => {
  return await prisma.jadwal_pegawai.create({
    data
  });
};

export const updateJadwalPegawai = async (id, data) => {
  return await prisma.jadwal_pegawai.update({
    where: {
      id_jadwal: id
    },
    data
  });
};

export const destroyJadwalPegawai = async (id) => {
  return await prisma.jadwal_pegawai.delete({
    where: {
      id_jadwal: id
    }
  });
};

export const destroyJadwalPegawaiByPegawai = async (id) => {
  return await prisma.jadwal_pegawai.deleteMany({
    where: {
      pegawai_id: id
    }
  });
};
