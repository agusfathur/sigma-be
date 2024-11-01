import { prisma } from "../utils/prisma.js";

export const getAppSetting = async () => {
  return await prisma.app_setting.findFirst({
    orderBy: {
      createdAt: "desc"
    }
  });
};

export const getAppSettingById = async (id) => {
  return await prisma.app_setting.findUnique({
    where: {
      id_app_setting: id
    }
  });
};

export const updateAppSetting = async (id, data) => {
  return await prisma.app_setting.update({
    where: {
      id_app_setting: id
    },
    data
  });
};
