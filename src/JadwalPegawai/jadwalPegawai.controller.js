// @ts-nocheck
import express, { query } from "express";
import {
  CreateJadwalPegawai,
  DestroyJadwalPegawai,
  GetAllJadwalPegawai,
  GetAllJadwalPegawaiByBulanTahun,
  GetAllJadwalPegawaiByPegawai,
  GetAllJadwalPegawaiByPegawaiBulanTahun,
  GetAllJadwalPegawaiByTahun,
  GetJadwalByPegawaiTanggal,
  GetJadwalByTanggal,
  GetJadwalPegawaiById,
  UpdateJadwalPegawai
} from "./jadwalPegawai.service.js";
import { JadwalPegawaiCreateSchema, JadwalPegawaiUpdateSchema } from "./jadwalPegawai.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let getAll;
  const query = req.query;
  try {
    if (query.tanggal) {
      getAll = await GetJadwalByTanggal(query.tanggal);
    } else if (query.bulan && query.tahun) {
      getAll = await GetAllJadwalPegawaiByBulanTahun(query.bulan, query.tahun);
    } else {
      getAll = await GetAllJadwalPegawai();
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jadwal Pegawai successfully retrieved",
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
    const getOne = await GetJadwalPegawaiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jadwal Pegawai Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jadwal Pegawai successfully retrieved",
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

router.get("/pegawai/:id", async (req, res) => {
  const id = req.params.id;
  const query = req.query;
  let getByPegawai;
  try {
    if (query.tanggal) {
      getByPegawai = await GetJadwalByPegawaiTanggal(query.tanggal, id);
    } else if (query.bulan && query.tahun) {
      getByPegawai = await GetAllJadwalPegawaiByPegawaiBulanTahun(query.bulan, query.tahun, id);
    } else if (query.tahun) {
      getByPegawai = await GetAllJadwalPegawaiByTahun(query.tahun, id);
    } else {
      getByPegawai = await GetAllJadwalPegawaiByPegawai(id);
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jadwal Pegawai By Pegawai successfully retrieved",
      data: getByPegawai
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

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    const validatedFields = await JadwalPegawaiCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateJadwalPegawai(validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jadwal Pegawai successfully created",
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
  const id = req.params.id;
  const data = req.body;

  try {
    const getOne = await GetJadwalPegawaiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jadwal Pegawai Not Found",
        data: {}
      });
    }
    const validatedFields = await JadwalPegawaiUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateJadwalPegawai(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jadwal Pegawai successfully updated",
      data: update
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
  const id = req.params.id;

  try {
    const getOne = await GetJadwalPegawaiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jadwal Pegawai Not Found",
        data: {}
      });
    }
    const destroy = await DestroyJadwalPegawai(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jadwal Pegawai successfully deleted",
      data: { result: "ok" }
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

const routesJadwalPegawai = router;

export default routesJadwalPegawai;
