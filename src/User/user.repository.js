import { prisma } from "../utils/prisma.js";

export const findAllUser = async (filter = {}) => {
  return await prisma.user.findMany({
    select: {
      id_user: true,
      name: true,
      image: true,
      username: true,
      email: true,
      role: true,
      refresh_token: true,
      createdAt: true,
      updatedAt: true
    },
    orderBy: {
      createdAt: "desc"
    },
    where: filter
  });
};

export const findUserByIdExclude = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id_user: id
    },
    select: {
      id_user: true,
      name: true,
      username: true,
      email: true,
      image: true,
      role: true,
      pegawai: true
    }
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id_user: id
    }
  });
};

export const findUserByUsername = async (username) => {
  return await prisma.user.findUnique({
    where: {
      username
    }
  });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  });
};

export const insertUser = async (data, prismaInstance = prisma) => {
  return await prismaInstance.user.create({
    data
  });
};

export const updateUserById = async (id, data, prismaInstance = prisma) => {
  return await prismaInstance.user.update({
    where: {
      id_user: id
    },
    data
  });
};

export const destroyUser = async (id, prismaInstance = prisma) => {
  return await prismaInstance.user.delete({
    where: {
      id_user: id
    }
  });
};
