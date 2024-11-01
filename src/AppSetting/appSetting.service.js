import { getAppSetting, getAppSettingById, updateAppSetting } from "./appSetting.repository.js";

export const GetAppSetting = async () => {
  const appSetting = await getAppSetting();
  return appSetting;
};

export const UpdateAppSetting = async (id, data) => {
  const appSetting = await updateAppSetting(id, data);
  return appSetting;
};
