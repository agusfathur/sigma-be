import { getIdentitasSekolah, updateIdentitasSekolah } from "./identitasSekolah.repository.js";

export const GetIdentitasSekolah = async () => {
  const data = await getIdentitasSekolah();
  return data;
};

export const UpdateIdentitasSekolah = async (id, data) => {
  await GetIdentitasSekolah();
  const update = await updateIdentitasSekolah(id, data);
  return update;
};
