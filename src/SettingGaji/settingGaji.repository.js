import { prisma } from "../utils/prisma.js";

export const getSettingGaji = async () => {
  return await prisma.setting_gaji.findFirst();
};

export const insertSettingGaji = async (data) => {
  return await prisma.setting_gaji.create({
    data
  });
};

export const updateSettingGaji = async (id, data) => {
  return await prisma.setting_gaji.update({
    where: {
      id_setting_gaji: id
    },
    data
  });
};

export const deleteSettingGaji = async (id) => {
  return await prisma.setting_gaji.delete({
    where: {
      id_setting_gaji: id
    }
  });
};
