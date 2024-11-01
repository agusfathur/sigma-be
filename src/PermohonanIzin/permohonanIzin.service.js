import { DeleteImage, GetPublicId, UploadFileIzin } from "../utils/cloudinary.js";
import {
  destroyPermohonanIzin,
  getAllPermohonanIzin,
  getAllPermohonanIzinByPegawai,
  getPermohonanIzinById,
  insertPermohonanIzin,
  updatePermohonanIzin
} from "./permohonanIzin.repository.js";

export const GetAllPermohonanIzin = async (filter = {}) => {
  const getAll = getAllPermohonanIzin(filter);

  return getAll;
};

export const GetPermohonanIzinById = async (id) => {
  const getOne = await getPermohonanIzinById(id);

  return getOne;
};

export const GetPermohonanIzinByPegawaiId = async (id) => {
  const getOne = await getAllPermohonanIzinByPegawai(id);

  return getOne;
};

export const CreatePermohonanIzin = async (data) => {
  try {
    const totalHari = DifferenceDate(data.tanggal_dari, data.tanggal_sampai);
    data.total_hari = totalHari;
    const create = await insertPermohonanIzin(data);
    const uploadFile = await UploadFileIzin(data.bukti);

    let updatedFileData;
    if (uploadFile) {
      updatedFileData = await updatePermohonanIzin(create.id_permohonan_izin, {
        bukti: uploadFile.secure_url
      });
    }

    return updatedFileData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const UpdatePermohonanIzin = async (id, data) => {
  const getIzin = await getPermohonanIzinById(id);
  try {
    const update = await updatePermohonanIzin(id, data);
    let updatedFileData;
    if (data.bukti && getIzin.bukti) {
      const publicId = GetPublicId(getIzin.bukti);
      await DeleteImage(publicId);
      const uploadFile = await UploadFileIzin(data.bukti);
      updatedFileData = await updatePermohonanIzin(update.id_permohonan_izin, {
        bukti: uploadFile.secure_url
      });
    }
    return updatedFileData;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export const UpdateStatusPermohonanIzin = async (id, status) => {
  const update = await updatePermohonanIzin(id, {
    status
  });

  return update;
};

export const DestroyPermohonanIzin = async (id) => {
  const getIzin = await getPermohonanIzinById(id);
  try {
    const destroy = await destroyPermohonanIzin(id);
    if (getIzin.bukti) {
      const publicId = GetPublicId(getIzin.bukti);
      await DeleteImage(publicId);
    }
    return destroy;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const AmbilFormatBukti = (bukti) => {
  const formatBukti = ["pdf", "jpg", "jpeg", "png", "PDF", "JPG", "JPEG", "PNG"];
  const ambilFormatBukti = bukti.split(".")[1];
  if (!formatBukti.includes(ambilFormatBukti)) return false;

  return ambilFormatBukti === "pdf" ? "pdf" : "image";
};

export const DifferenceDate = (tglDari, tglSampai) => {
  const date1 = new Date(tglDari);
  const date2 = new Date(tglSampai);
  let Difference_In_Time = date2.getTime() - date1.getTime();
  // hitung jml hari antara dua tanggal
  let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1;
  return Math.floor(Difference_In_Days);
};
