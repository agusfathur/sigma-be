// @ts-nocheck
import express from "express";
import {
  CreatePegawai,
  DeletePegawai,
  GetAllPegawai,
  GetPegawaiById,
  GetPegawaiByUserId,
  UpdatePegawai
} from "./pegawai.service.js";
import { PegawaiCreateSchema, PegawaiUpdateSchema } from "./pegawai.validation.js";
import { validateImage } from "../utils/cloudinary.js";
import { UserCreateSchema, UserUpdateSchema } from "../User/user.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllPegawai();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pegawai successfully retrieved",
      data: getAll
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await GetPegawaiById(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pegawai successfully retrieved",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

// by user id
router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await GetPegawaiByUserId(id);
    if (!data) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pegawai not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pegawai successfully retrieved",
      data: data
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  const image = req.files.foto;
  const validatedImage = validateImage(image);

  const validatedFieldsForUser = await UserCreateSchema.safeParseAsync(data);

  data.foto = image.name;
  data.jumlah_istri = Number(data.jumlah_istri);
  data.jumlah_anak = Number(data.jumlah_anak);

  const validatedFields = await PegawaiCreateSchema.safeParseAsync(data);
  if (!validatedFieldsForUser.success || !validatedFields.success || !validatedImage.status) {
    console.log({
      ...validatedFieldsForUser?.error?.flatten()?.fieldErrors,
      ...validatedFields?.error?.flatten()?.fieldErrors,
      ...validatedImage?.messag
    });
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: {
        ...validatedFieldsForUser?.error?.flatten()?.fieldErrors,
        ...validatedFields?.error?.flatten()?.fieldErrors,
        ...validatedImage?.message
      },
      data: {}
    });
  }
  try {
    const allData = {
      ...validatedFieldsForUser.data,
      ...validatedFields.data,
      ...validatedImage.data
    };
    const create = await CreatePegawai(allData);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Pegawai successfully created",
      data: create
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.put("/:id", async (req, res) => {
  const pegawaiId = req.params.id;
  const data = req.body;
  data.pegawaiId = pegawaiId;
  try {
    const getOnePegawai = await GetPegawaiById(pegawaiId);
    if (getOnePegawai.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pegawai not found",
        data: {}
      });
    }

    let validatedImage;
    if (req.files?.foto) {
      const image = req.files?.foto;
      validatedImage = validateImage(image);
    } else {
      validatedImage = {
        status: true
      };
    }

    let validatedUserFields;
    data.userId = getOnePegawai.user_id;
    if (data.username || data.password || data.email || data.role || data.nama) {
      validatedUserFields = await UserUpdateSchema.safeParseAsync(data);
    }

    if (data.jumlah_anak !== undefined || data.jumlah_istri !== undefined) {
      data.jumlah_istri = Number(data.jumlah_istri);
      data.jumlah_anak = Number(data.jumlah_anak);
    }

    // Pastikan data.jabatan_fungsional_id selalu dalam bentuk array
    const jabatanFungsionalId = Array.isArray(data.jabatan_fungsional_id)
      ? data.jabatan_fungsional_id
      : [data.jabatan_fungsional_id]; // Bungkus dalam array jika hanya satu elemen

    // Tambahkan kembali data yang sudah dibungkus array ini ke objek data
    data.jabatan_fungsional_id = jabatanFungsionalId;

    const validatedPegawaiFields = await PegawaiUpdateSchema.safeParseAsync(data);

    if (
      (validatedPegawaiFields && !validatedPegawaiFields.success) ||
      (validatedUserFields && !validatedUserFields.success) ||
      (validatedImage && !validatedImage.status)
    ) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: {
          ...validatedPegawaiFields?.error?.flatten().fieldErrors,
          ...validatedUserFields?.error?.flatten()?.fieldErrors,
          ...validatedImage?.message
        },
        data: { ...validatedPegawaiFields?.success, ...validatedUserFields?.success, ...validatedImage?.status }
      });
    }

    const allData = {};
    allData.dataUser = validatedUserFields?.data;
    allData.dataPegawai = validatedPegawaiFields?.data;
    allData.dataImage = validatedImage?.data;
    const updatePegawai = await UpdatePegawai(pegawaiId, allData);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pegawai successfully retrieved",
      data: updatePegawai
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.delete("/:id", async (req, res) => {
  const pegawaiId = req.params.id;
  try {
    const getOnePegawai = await GetPegawaiById(pegawaiId);
    if (!getOnePegawai) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pegawai not found",
        data: {}
      });
    }
    const deletePegawai = await DeletePegawai(pegawaiId);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pegawai successfully deleted",
      data: deletePegawai
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

const routesPegawai = router;

export default routesPegawai;
