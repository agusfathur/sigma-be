import { prisma } from "../utils/prisma.js";
export const getAllPembayaranGaji = async (filter = {}) => {
  const data = await prisma.pembayaran_gaji.findMany(
    {
      include: {
        user: true,
        slip_gaji: true
      },
      where: filter
    },
    { orderBy: { createdAt: "desc" } }
  );
  return data;
};

export const getPembayaranGajiById = async (id) => {
  const data = await prisma.pembayaran_gaji.findFirst({
    where: { id_pembayaran_gaji: id },
    include: {
      user: true,
      slip_gaji: true
    }
  });
  return data;
};

export const getPembayaranGajiBySlipGajiId = async (id) => {
  const data = await prisma.pembayaran_gaji.findFirst({
    where: { slip_gaji_id: id },
    include: {
      user: true,
      slip_gaji: true
    }
  });
  return data;
};

export const getPembayaranGajiByUserId = async (id) => {
  const data = await prisma.pembayaran_gaji.findMany({
    where: { user_id: id },
    include: {
      user: true,
      slip_gaji: true
    }
  });
  return data;
};

export const getPembayaranGajiByUserIdAndSlipGajiId = async (userId, slipGajiId) => {
  const data = await prisma.pembayaran_gaji.findFirst({
    where: { user_id: userId, slip_gaji_id: slipGajiId },
    include: {
      user: true,
      slip_gaji: true
    }
  });
  return data;
};

export const getPembayaranGajiByPegawai = async (id) => {
  const data = await prisma.pembayaran_gaji.findMany({
    where: {
      slip_gaji: {
        pegawai_id: id
      }
    },
    include: {
      user: true,
      slip_gaji: true
    }
  });
  return data;
};

export const insertPembayaranGaji = async (data) => {
  const insert = await prisma.pembayaran_gaji.create({
    data
  });
  return insert;
};

export const updatePembayaranGaji = async (id, data) => {
  const update = await prisma.pembayaran_gaji.update({
    where: { id_pembayaran_gaji: id },
    data
  });
  return update;
};

export const deletePembayaranGaji = async (id) => {
  const deleteData = await prisma.pembayaran_gaji.delete({
    where: { id_pembayaran_gaji: id }
  });
  return deleteData;
};
