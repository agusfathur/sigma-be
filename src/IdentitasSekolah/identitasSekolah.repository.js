import { prisma } from "../utils/prisma.js";

export const getIdentitasSekolah = async () => {
  return await prisma.identitas_sekolah.findFirst();
};

export const updateIdentitasSekolah = async (id, data) => {
  return await prisma.identitas_sekolah.update({
    where: {
      id_identitas_sekolah: id
    },
    data
  });
};
