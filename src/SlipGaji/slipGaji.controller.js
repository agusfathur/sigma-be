// @ts-nocheck

import express from "express";
import {
  CreateManySlipGaji,
  DeleteSlipGaji,
  GetAllSlipGaji,
  GetAllSlipGajiByBulanTahun,
  GetAllSlipGajiByBulanTahunPegawai,
  GetAllSlipGajiByPegawai,
  GetAllSlipGajiByTahunPegawai,
  GetSlipGajiById,
  UpdateManySlipGaji,
  UpdateSlipGaji
} from "./slipGaji.service.js";
import { SlipGajiCreateSchema } from "./slipGaji.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { bulan, tahun } = req.query;

  try {
    let getAll;

    if (bulan && tahun) {
      getAll = await GetAllSlipGajiByBulanTahun(Number(bulan), Number(tahun));
    } else {
      getAll = await GetAllSlipGaji();
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Slip Gaji successfully retrieved",
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
    const getOne = await GetSlipGajiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Slip Gaji Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Slip Gaji successfully retrieved",
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

// By Pegawai
router.get("/pegawai/:id", async (req, res) => {
  const pegawaiId = req.params.id;
  const { bulan, tahun } = req.query;
  let getAllData;
  try {
    if (bulan && tahun) {
      getAllData = await GetAllSlipGajiByBulanTahunPegawai(Number(bulan), Number(tahun), pegawaiId);
    } else if (tahun) {
      getAllData = await GetAllSlipGajiByTahunPegawai(Number(tahun), pegawaiId);
    } else {
      getAllData = await GetAllSlipGajiByPegawai(pegawaiId);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Slip Gaji successfully retrieved",
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

router.post("/", async (req, res) => {
  const data = req.body;

  try {
    const validatedFields = SlipGajiCreateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const insert = await CreateManySlipGaji(validatedFields.data.bulan, validatedFields.data.tahun);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Slip Gaji successfully created",
      data: insert
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

router.put("/", async (req, res) => {
  const { bulan, tahun } = req.body;
  const data = req.body;

  try {
    const validatedFields = SlipGajiCreateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateManySlipGaji(validatedFields.data.bulan, validatedFields.data.tahun);
    if (!update.status) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: update.message,
        data: {}
      });
    }
    return res.status(200).json({
      status: update.status,
      statusCode: update.statusCode,
      message: update.message,
      data: update.data
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
    const deleteData = await DeleteSlipGaji(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Slip Gaji successfully deleted",
      data: deleteData
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

const routesSlipGaji = router;
export default routesSlipGaji;
