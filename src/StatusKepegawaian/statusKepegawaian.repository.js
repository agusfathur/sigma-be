import { prisma } from "../utils/prisma.js";

export const getStatusKepegawaian = async () => {
  return await prisma.status_kepegawaian.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getStatusKepegawaianById = async (id) => {
  return await prisma.status_kepegawaian.findUnique({
    where: {
      id_status_kepegawaian: id
    }
  });
};

export const createStatusKepegawaian = async (data) => {
  return await prisma.status_kepegawaian.create({
    data
  });
};

export const updateStatusKepegawaian = async (id, data) => {
  return await prisma.status_kepegawaian.update({
    where: {
      id_status_kepegawaian: id
    },
    data
  });
};

export const destroyStatusKepegawaian = async (id) => {
  return await prisma.status_kepegawaian.delete({
    where: {
      id_status_kepegawaian: id
    }
  });
};
