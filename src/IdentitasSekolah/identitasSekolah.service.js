import { DeleteImage, GetPublicId, UploadImageAppLogo } from "../utils/cloudinary.js";
import { getIdentitasSekolah, updateIdentitasSekolah } from "./identitasSekolah.repository.js";

export const GetIdentitasSekolah = async () => {
  const data = await getIdentitasSekolah();
  return data;
};

export const UpdateIdentitasSekolah = async (id, data) => {
  const { logo, ...validatedData } = data;
  if (logo) {
    const sekolah = await getIdentitasSekolah();
    const publidId = GetPublicId(sekolah.logo);
    await DeleteImage(publidId);
    const uploadImage = await UploadImageAppLogo(logo);
    validatedData.logo = uploadImage.secure_url;
  }

  const update = await updateIdentitasSekolah(id, validatedData);
  return update;
};
