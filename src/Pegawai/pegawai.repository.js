import { prisma } from "../utils/prisma.js";

export const getAllPegawai = async (filter = {}) => {
  return await prisma.pegawai.findMany({
    include: {
      jabatan: true,
      jabatanFungsional: {
        include: {
          jabatanFungsional: true
        }
      },
      user: true,
      data_lokasi: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const getPegawaiById = async (id) => {
  return await prisma.pegawai.findUnique({
    where: {
      id_pegawai: id
    },
    include: {
      jabatan: true,
      jabatanFungsional: {
        include: {
          jabatanFungsional: true
        }
      },
      user: true,
      data_lokasi: true
    }
  });
};

export const getPegawaiByStatus = async (status_pegawai) => {
  return await prisma.pegawai.findMany({
    where: {
      status_pegawai
    },

    select: {
      id_pegawai: true,
      nama: true,
      status_pegawai: true,
      jabatan: true,
      tunjangan_tetap_pegawai: true,
      jabatanFungsional: {
        include: {
          jabatanFungsional: true
        }
      },
      data_lokasi: true
    }
  });
};

export const getPegawaiByEmail = async (email) => {
  const pegawai = await prisma.pegawai.findUnique({
    where: {
      email
    }
  });

  if (!pegawai) {
    return null;
  }
  return await getPegawaiById(pegawai.id_pegawai);
};
export const getPegawaiByNomorHP = async (nomor_hp) => {
  const pegawai = await prisma.pegawai.findUnique({
    where: {
      nomor_hp
    }
  });

  if (!pegawai) {
    return null;
  }

  return await getPegawaiById(pegawai.id_pegawai);
};
export const getPegawaiByNIK = async (nik) => {
  const pegawai = await prisma.pegawai.findUnique({
    where: {
      nik
    }
  });

  if (!pegawai) {
    return null;
  }

  return await getPegawaiById(pegawai.id_pegawai);
};
export const getPegawaiByUser = async (user_id) => {
  const pegawai = await prisma.pegawai.findFirst({
    where: {
      user_id
    }
  });

  if (!pegawai) {
    return null;
  }

  return await getPegawaiById(pegawai.id_pegawai);
};

export const getPegawaiByNIP = async (nip) => {
  const pegawai = await prisma.pegawai.findFirst({
    where: {
      nip
    }
  });

  if (!pegawai) {
    return null;
  }

  return await getPegawaiById(pegawai.id_pegawai);
};

export const getPegawaiByNoRek = async (nomor_rekening) => {
  try {
    const pegawai = await prisma.pegawai.findFirst({
      where: {
        nomor_rekening
      }
    });

    if (!pegawai) {
      return null;
    }
    return await getPegawaiById(pegawai.id_pegawai);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const insertPegawai = async (data, prismaInstance = prisma) => {
  return await prismaInstance.pegawai.create({
    data
  });
};

export const updatePegawaiById = async (id, data, prismaInstance = prisma) => {
  return await prismaInstance.pegawai.update({
    where: {
      id_pegawai: id
    },
    data
  });
};

export const destroyPegawai = async (id, prismaInstance = prisma) => {
  return await prismaInstance.pegawai.delete({
    where: {
      id_pegawai: id
    }
  });
};
