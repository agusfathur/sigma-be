import {
  createDataLokasi,
  destroyDataLokasi,
  getDataLokasi,
  getDataLokasiById,
  updateDataLokasi
} from "./dataLokasi.repository.js";

export const GetAllDataLokasi = async () => {
  const data = await getDataLokasi();
  return data;
};

export const GetDataLokasiById = async (id) => {
  const data = await getDataLokasiById(id);
  return data;
};

export const CreateDataLokasi = async (data) => {
  const getAll = await getDataLokasi();
  let kode = "MI-";
  if (getAll.length === 0) {
    kode = "MI-01";
  } else {
    const lastData = getAll[0];
    const kodeLastData = lastData.kode.split("-")[1];
    if (getAll.length)
      if (Number(kodeLastData) < 10) {
        const incrementKodeLast = Number(kodeLastData) + 1;
        kode = `${kode}0${incrementKodeLast}`;
      } else {
        const incrementKodeLast = Number(kodeLastData) + 1;
        kode = `${kode}${incrementKodeLast}`;
      }
  }

  const newData = await createDataLokasi({
    nama: data.nama,
    kode,
    alamat: data.alamat,
    koordinat: data.koordinat,
    luas_lokasi: data.luas_lokasi
  });
  return newData;
};

export const UpdateDataLokasi = async (id, data) => {
  const updatedData = await updateDataLokasi(id, data);
  return updatedData;
};

export const DeleteDataLokasi = async (id) => {
  const deletedData = await destroyDataLokasi(id);
  return deletedData;
};
