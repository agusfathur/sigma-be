// @ts-nocheck
import express from "express";
import {
  CreateJenisIzin,
  DeleteJenisIzin,
  GetAllJenisIzin,
  GetAllJenisIzinByJenis,
  GetAllJenisIzinByTahun,
  GetAllJenisIzinByTahunAndJenis,
  GetJenisById,
  UpdateJenisIzin
} from "./jenisIzin.service.js";
import { JenisIzinCreateSchema, JenisIzinUpdateSchema } from "./jenisIzin.validation.js";
import { getJenisIzinById } from "./jenisIzin.repository.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const tahun = req.query.tahun;
  const jenis = req.query.jenis;
  try {
    let getAll;
    if (tahun && jenis) {
      getAll = await GetAllJenisIzinByTahunAndJenis(tahun, jenis);
    } else if (tahun) {
      getAll = await GetAllJenisIzinByTahun(tahun);
    } else if (jenis) {
      getAll = await GetAllJenisIzinByJenis(jenis);
    } else {
      getAll = await GetAllJenisIzin();
    }
    if (!getAll) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jenis Izin Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: false,
      statusCode: 200,
      message: "Jenis Izin successfully retrivied",
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
    const getOne = await GetJenisById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jenis Izin Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: false,
      statusCode: 404,
      message: "Jenis Izin succescfully retrivied",
      data: getOne
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

  try {
    const validatedFields = await JenisIzinCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateJenisIzin({
      nama: validatedFields.data.nama,
      jenis: validatedFields.data.jenis,
      jatah: Number(validatedFields.data.jatah),
      tahun: Number(validatedFields.data.tahun)
    });

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jenis Izin successfully created",
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
  const data = req.body;
  const id = req.params.id;

  try {
    const getOne = await GetJenisById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jenis Izin not found",
        data: {}
      });
    }

    const validatedFields = await JenisIzinUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    if (validatedFields.data.jatah) validatedFields.data.jatah = Number(validatedFields.data.jatah);
    if (validatedFields.data.tahun) validatedFields.data.tahun = Number(validatedFields.data.tahun);
    const update = await UpdateJenisIzin(id, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jenis Izin successfully updated",
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
    const getOne = await GetJenisById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jenis Izin not found",
        data: {}
      });
    }

    const destroy = await DeleteJenisIzin(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jenis Izin successfully deleted",
      data: {}
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

const routesJenisIzin = router;

export default routesJenisIzin;
