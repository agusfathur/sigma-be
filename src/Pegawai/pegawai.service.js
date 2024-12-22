import { updateUserById } from "../User/user.repository.js";
import { CreateUser, DeleteUserById, UpdateUserById } from "../User/user.service.js";
import { DeleteImage, GetPublicId, UploadImageProfile } from "../utils/cloudinary.js";
import { prisma } from "../utils/prisma.js";
import {
  destroyPegawai,
  getAllPegawai,
  getPegawaiByEmail,
  getPegawaiById,
  getPegawaiByNIK,
  getPegawaiByNIP,
  getPegawaiByNoRek,
  getPegawaiByStatus,
  getPegawaiByUser,
  insertPegawai,
  updatePegawaiById
} from "./pegawai.repository.js";

export const GetAllPegawai = async () => {
  const data = await getAllPegawai();
  return data;
};

export const GetPegawaiById = async (id) => {
  const data = await getPegawaiById(id);
  return data;
};
export const GetPegawaiByEmail = async (email) => {
  const data = await getPegawaiByEmail(email);
  return data;
};
export const GetPegawaiByUserId = async (userId) => {
  const data = await getPegawaiByUser(userId);
  return data;
};

export const GetPegawaiByNIP = async (nip) => {
  const data = await getPegawaiByNIP(nip);
  return data;
};

export const GetPegawaiByNIK = async (nik) => {
  const data = await getPegawaiByNIK(nik);
  return data;
};

export const GetPegawaiByNoRek = async (nomor_rekening) => {
  const data = await getPegawaiByNoRek(nomor_rekening);
  return data;
};

export const GetAllPegawaiByStatus = async (status_pegawai) => {
  const data = await getPegawaiByStatus(status_pegawai);
  return data;
};

export const CreatePegawai = async (data) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const { username, password, role, jabatan_fungsional_id, fileName, path, ...pegawaiData } = data;

      const createdUser = await CreateUser(
        {
          username: username,
          password: password,
          name: pegawaiData.nama,
          email: pegawaiData.email,
          role: role,
          image: pegawaiData.foto
        },
        prisma
      );
      pegawaiData.user_id = createdUser.id_user;
      pegawaiData.foto = createdUser.image;

      // Mengonversi array menjadi string tanpa tanda kurung siku dan tanpa tanda kutip di sekitar setiap elemen
      // console.log(jabatan_fungsional_id);
      const createdPegawai = await insertPegawai(pegawaiData, prisma);
      let pegawaiJabatanFungsional;
      if (jabatan_fungsional_id && jabatan_fungsional_id.length > 0 && createdPegawai.id_pegawai !== null) {
        pegawaiJabatanFungsional = await prisma.pegawaiJabatanFungsional.createMany({
          data: jabatan_fungsional_id.map((id) => ({
            pegawai_id: createdPegawai.id_pegawai,
            jabatan_fungsional_id: id
          }))
        });
        // console.log(pegawaiJabatanFungsional);
      }
      if (createdPegawai.id_pegawai === null) {
        if (createdUser.id_user !== null) {
          await DeleteUserById(createdUser.id_user, prisma);
        }
      }
      return { createdUser, createdPegawai, pegawaiJabatanFungsional };
    });
    const uploadImage = await UploadImageProfile(data.path);
    await updatePegawaiById(result.createdPegawai.id_pegawai, {
      foto: uploadImage.secure_url
    });
    await updateUserById(result.createdUser.id_user, {
      image: uploadImage.secure_url
    });
    return { ...result, uploadImage };
  } catch (error) {
    console.error("Error creating pegawai and user: ", error.message);
    throw error;
  }
};

export const UpdatePegawai = async (id, data) => {
  const getPegawai = await GetPegawaiById(id);
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const { pegawaiId, jabatan_fungsional_id, ...pegawaiData } = data.dataPegawai;
      // console.log(jabatan_fungsional_id);

      const updatedPegawai = await updatePegawaiById(id, pegawaiData, prisma);
      let userData;
      let updatedUser;
      if (data.dataUser) {
        // Destructure data yang dibutuhkan
        const { nama, ...otherData } = data.dataUser;

        // Buat objek userData dengan data yang benar
        userData = {
          ...otherData,
          name: data.dataUser.nama // Gunakan name langsung
        };

        // Update user
        updatedUser = await UpdateUserById(getPegawai.user_id, userData, prisma);
      }

      let pegawaiJabatanFungsional;

      // Ambil jabatan fungsional yang ada saat ini
      const existingJabatan = getPegawai.jabatanFungsional?.map((jbt) => jbt.jabatan_fungsional_id) || [];

      // Jika input jabatan kosong dan sebelumnya ada jabatan
      if ((!jabatan_fungsional_id || jabatan_fungsional_id.length === 0) && existingJabatan.length > 0) {
        // Hapus semua jabatan
        await prisma.pegawaiJabatanFungsional.deleteMany({
          where: {
            pegawai_id: updatedPegawai.id_pegawai
          }
        });
      }
      // Jika ada input jabatan baru
      else if (jabatan_fungsional_id && jabatan_fungsional_id.length > 0) {
        // Jika belum ada jabatan sama sekali
        if (existingJabatan.length === 0) {
          // Langsung tambah semua jabatan baru
          pegawaiJabatanFungsional = await prisma.pegawaiJabatanFungsional.createMany({
            data: jabatan_fungsional_id.map((id) => ({
              pegawai_id: updatedPegawai.id_pegawai,
              jabatan_fungsional_id: id
            }))
          });
        }
        // Jika sudah ada jabatan sebelumnya
        else {
          // Cari jabatan yang perlu dihapus dan ditambah
          const jabatanToDelete = existingJabatan.filter((id) => !jabatan_fungsional_id.includes(id));
          const jabatanToAdd = jabatan_fungsional_id.filter((id) => !existingJabatan.includes(id));

          // Jika ada perubahan (penambahan atau pengurangan)
          if (jabatanToAdd.length > 0 || jabatanToDelete.length > 0) {
            // Hapus jabatan yang tidak ada di input
            if (jabatanToDelete.length > 0) {
              await prisma.pegawaiJabatanFungsional.deleteMany({
                where: {
                  AND: [{ pegawai_id: updatedPegawai.id_pegawai }, { jabatan_fungsional_id: { in: jabatanToDelete } }]
                }
              });
            }

            // Tambah jabatan baru
            if (jabatanToAdd.length > 0) {
              pegawaiJabatanFungsional = await prisma.pegawaiJabatanFungsional.createMany({
                data: jabatanToAdd.map((id) => ({
                  pegawai_id: updatedPegawai.id_pegawai,
                  jabatan_fungsional_id: id
                }))
              });
            }
          }
        }
      }

      // Debug log
      // console.log("Existing Jabatan:", existingJabatan);
      // console.log("Input Jabatan:", jabatan_fungsional_id);
      // console.log("Created Jabatan:", pegawaiJabatanFungsional);
      return { updatedPegawai, updatedUser, pegawaiJabatanFungsional };
    });

    let uploadImage;
    if (data.dataImage) {
      const { path } = data.dataImage;
      if (result.updatedPegawai.foto) {
        uploadImage = await UploadImageProfile(path);
        const publidImageId = GetPublicId(result.updatedPegawai.foto);
        await DeleteImage(publidImageId);
        await updatePegawaiById(result.updatedPegawai.id_pegawai, {
          foto: uploadImage.secure_url
        });
        await updateUserById(result.updatedPegawai.user_id, {
          image: uploadImage.secure_url
        });
      } else {
        uploadImage = await UploadImageProfile(path);
        await updatePegawaiById(result.updatedPegawai.id_pegawai, {
          foto: uploadImage.secure_url
        });
        await updateUserById(result.updatedPegawai.user_id, {
          image: uploadImage.secure_url
        });
      }
    }

    return { ...result, uploadImage };
  } catch (error) {
    console.error("Error updating pegawai and user:", error);
    throw error;
  }
};

export const DeletePegawai = async (id) => {
  const getPegawai = await GetPegawaiById(id);
  try {
    const result = await prisma.$transaction(async (prisma) => {
      let deletedJabatanFungsional;
      if (getPegawai.jabatanFungsional) {
        deletedJabatanFungsional = await prisma.pegawaiJabatanFungsional.deleteMany({
          where: {
            pegawai_id: getPegawai.id_pegawai
          }
        });
      }
      const deletedPegawai = await destroyPegawai(id, prisma);
      const deletedUser = await DeleteUserById(getPegawai.user.id_user, prisma);

      if (deletedPegawai && deletedUser && deletedJabatanFungsional) {
        return { deletedPegawai, deletedUser, deletedJabatanFungsional };
      }
      return { deletedPegawai, deletedUser };
    });

    let deleteImage;

    const publidImageId = GetPublicId(getPegawai.foto);
    deleteImage = await DeleteImage(publidImageId);

    return { result: "ok" };
  } catch (error) {
    console.error("Error delete pegawai and user:", error);
    throw error;
  }
};
