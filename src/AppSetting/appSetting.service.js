import { DeleteImage, GetPublicId, UploadImageAppLogo } from "../utils/cloudinary.js";
import { getAppSetting, updateAppSetting } from "./appSetting.repository.js";

export const GetAppSetting = async () => {
  const appSetting = await getAppSetting();
  return appSetting;
};

export const UpdateAppSetting = async (id, data) => {
  if (data.logo_sistem) {
    const app = await GetAppSetting();
    const publicId = GetPublicId(app.logo_sistem);
    await DeleteImage(publicId);
    const uploadImage = await UploadImageAppLogo(data.logo_sistem);
    data.logo_sistem = uploadImage.secure_url;
  }

  const appSetting = await updateAppSetting(id, data);
  return appSetting;
};
