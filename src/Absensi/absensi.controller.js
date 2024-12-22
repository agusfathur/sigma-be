// @ts-nocheck
import express from "express";
import {
  CreateAbsensi,
  CreateAbsensiMasuk,
  CreateAbsensiPulang,
  DeleteAbsensi,
  GetAbsensiById,
  GetAbsensiByTahun,
  GetAbsensiByTanggal,
  GetAbsensiByTanggalPegawai,
  GetAllAbsensi,
  GetAllAbsensiByBulanTahun,
  GetAllAbsensiByBulanTahunByPegawai,
  UpdateAbsensi
} from "./absensi.service.js";
import { AbsensiBerangkatSchema, AbsensiPulangSchema } from "./absensi.validation.js";
import { validateImage } from "../utils/cloudinary.js";
import { getJadwalPegawaiById } from "../JadwalPegawai/jadwalPegawai.repository.js";
const router = express.Router();

router.get("/", async (req, res) => {
  let getAll;
  const query = req.query;
  try {
    if (query.tanggal) {
      const tanggal = query.tanggal;
      getAll = await GetAbsensiByTanggal(tanggal);
    } else if (query.bulan && query.tahun) {
      const bulan = query.bulan;
      const tahun = query.tahun;
      getAll = await GetAllAbsensiByBulanTahun(bulan, tahun);
    } else {
      getAll = await GetAllAbsensi();
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully retrieved",
      data: getAll
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getOne = await GetAbsensiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Absensi Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully retrieved",
      data: getOne
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

router.post("/masuk", async (req, res) => {
  const data = req.body;

  try {
    data.foto_masuk = req.files?.foto_masuk.name;

    const validatedFieldsMasuk = AbsensiBerangkatSchema.safeParse(data);
    const validatedImage = validateImage(req.files?.foto_masuk);

    if (!validatedFieldsMasuk.success || !validatedImage.status) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: { ...validatedFieldsMasuk?.error?.flatten()?.fieldErrors, ...validatedImage?.message },
        data: {}
      });
    }
    data.imagePath = validatedImage.data.path;
    const create = await CreateAbsensiMasuk(data);

    if (!create.status) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: create.message,
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully created",
      data: create.data
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

router.post("/pulang", async (req, res) => {
  const data = req.body;
  try {
    data.foto_pulang = req.files?.foto_pulang.name;
    const validatedFieldsPulang = AbsensiPulangSchema.safeParse(data);
    const validatedImage = validateImage(req.files?.foto_pulang);

    if (!validatedFieldsPulang.success || !validatedImage.status) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: { ...validatedFieldsPulang?.error?.flatten()?.fieldErrors, ...validatedImage?.message },
        data: {}
      });
    }
    data.imagePath = validatedImage.data.path;
    const create = await CreateAbsensiPulang(data);
    if (!create.status) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: create.message,
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully created",
      data: create
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const getOne = await GetAbsensiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Absensi not found",
        data: {}
      });
    }

    const update = await UpdateAbsensi(id, data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully updated",
      data: update
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const getOne = await GetAbsensiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Absensi not found",
        data: {}
      });
    }

    const destroy = await DeleteAbsensi(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully deleted",
      data: {}
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

// pegawai absensi
router.get("/pegawai/:id", async (req, res) => {
  const pegawaiId = req.params.id;
  let getAll;
  const query = req.query;
  try {
    if (query.tanggal) {
      const tanggal = query.tanggal;
      getAll = await GetAbsensiByTanggalPegawai(tanggal, pegawaiId);
    } else if (query.bulan && query.tahun) {
      const bulan = query.bulan;
      const tahun = query.tahun;
      getAll = await GetAllAbsensiByBulanTahunByPegawai(bulan, tahun, pegawaiId);
    } else if (query.tahun) {
      const tahun = query.tahun;
      getAll = await GetAbsensiByTahun(tahun, pegawaiId);
    } else {
      getAll = await GetAllAbsensiByPegawai(pegawaiId);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Absensi successfully retrieved by pegawai",
      data: getAll
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: error.message,
      data: {}
    });
  }
});

const routesAbsensi = router;

export default routesAbsensi;
