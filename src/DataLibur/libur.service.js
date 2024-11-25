import { destroyAbsensi, getAllAbsensi, insertAbsensi, updateAbsensi } from "../Absensi/absensi.repository.js";
import { GetAllPegawaiByStatus } from "../Pegawai/pegawai.service.js";
import { destroyLibur, getAllLibur, getLiburById, insertLibur, updateLibur } from "./libur.repository.js";

export const GetAllLibur = async () => {
  const getData = await getAllLibur();
  return getData;
};

export const GetLiburById = async (id) => {
  const getData = await getLiburById(id);
  return getData;
};

export const CreateLibur = async (data) => {
  // Buat Absensi agar ketika status hadir, maka buat
  try {
    if (data.status_absen === "hadir") {
      const allPegawai = await GetAllPegawaiByStatus("aktif");
      for await (const pge of allPegawai) {
        const createAbsensi = await insertAbsensi({
          pegawai_id: pge.id_pegawai,
          tanggal_absen: data.tanggal,
          status_absen: data.status_absen
        });
      }
    }
    const create = await insertLibur(data);
    return create;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateLibur = async (id, data) => {
  try {
    const getLibur = await getLiburById(id);
    if (getLibur && getLibur.status_absen !== data.status_absen) {
      if (data.status_absen === "hadir") {
        const allPegawai = await GetAllPegawaiByStatus("aktif");
        for await (const pge of allPegawai) {
          const createAbsensi = await insertAbsensi({
            pegawai_id: pge.id_pegawai,
            tanggal_absen: data.tanggal,
            status_absen: data.status_absen
          });
        }
      } else if (data.status_absen === "tidak_hadir") {
        const getAbsensi = await getAllAbsensi({ status_absen: "hadir", tanggal_absen: getLibur.tanggal });
        if (getAbsensi.length > 0) {
          for await (const dest of getAbsensi) {
            await destroyAbsensi(dest.id_absen);
          }
        }
      }
    } else if (getLibur) {
      // update tanggal
      if (data.status_absen === "hadir") {
        const getAbsensi = await getAllAbsensi({ status_absen: "hadir", tanggal_absen: getLibur.tanggal });
        if (getAbsensi.length > 0) {
          for await (const upt of getAbsensi) {
            await updateAbsensi(upt.id_absen, { tanggal_absen: data.tanggal });
          }
        }
      }
    }
    const update = await updateLibur(id, data);
    return update;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteLibur = async (id) => {
  try {
    const getLibur = await getLiburById(id);
    if (getLibur && getLibur.status_absen === "hadir") {
      const getAbsensi = await getAllAbsensi({ status_absen: "hadir", tanggal_absen: getLibur.tanggal });
      if (getAbsensi.length > 0) {
        for await (const dest of getAbsensi) {
          await destroyAbsensi(dest.id_absen);
        }
      }
    }
    const destroy = await destroyLibur(id);
    return destroy;
  } catch (error) {
    console.log(error);
  }
};
