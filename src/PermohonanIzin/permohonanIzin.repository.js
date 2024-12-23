import { prisma } from "../utils/prisma.js";

export const getAllPermohonanIzin = async (filter = {}) => {
  return await prisma.permohonan_izin.findMany({
    include: {
      pegawai: true,
      pegawai: {
        include: {
          jabatan: true
        }
      },
      jenis_izin: true
    },
    where: filter,
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getAllPermohonanIzinByPegawai = async (id) => {
  return await prisma.permohonan_izin.findMany({
    where: {
      pegawai_id: id
    },
    include: {
      pegawai: true,
      jenis_izin: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getPermohonanIzinById = async (id) => {
  return await prisma.permohonan_izin.findUnique({
    where: {
      id_permohonan_izin: id
    },
    include: {
      pegawai: true,
      jenis_izin: true
    }
  });
};

export const insertPermohonanIzin = async (data) => {
  return await prisma.permohonan_izin.create({
    data
  });
};

export const updatePermohonanIzin = async (id, data) => {
  return await prisma.permohonan_izin.update({
    where: {
      id_permohonan_izin: id
    },
    data
  });
};

export const destroyPermohonanIzin = async (id) => {
  return await prisma.permohonan_izin.delete({
    where: {
      id_permohonan_izin: id
    }
  });
};
