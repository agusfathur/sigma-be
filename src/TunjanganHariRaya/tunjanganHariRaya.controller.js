// @ts-nocheck
import express from "express";
import {
  CreateTHR,
  DeleteTHRById,
  GetAllTHR,
  GetAllTHRByPegawai,
  GetTHRById,
  GetTHRByTahun,
  UpdateTHRById
} from "./tunjanganHariRaya.service.js";
import { THRCreateSchema, THRUpdateSchema } from "./tunjanganHariRaya.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let thr;

    const { tahun } = req.query;
    if (tahun) {
      thr = await GetTHRByTahun(Number(tahun));
    } else {
      thr = await GetAllTHR();
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "THR successfully retrieved",
      data: thr
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
    const THR = await GetTHRById(id);
    if (!THR) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "THR not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "THR successfully retrieved",
      data: THR
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

router.get("/pegawai/:id", async (req, res) => {
  const pegawaiId = req.params.id;
  try {
    const THR = await GetAllTHRByPegawai(pegawaiId);
    if (THR.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "THR By Pegawai not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "THR By Pegawai successfully retrieved",
      data: THR
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
    const validatedFields = await THRCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const createTHR = await CreateTHR(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "THR successfully created",
      data: createTHR
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
  const THRId = req.params.id;
  const data = req.body;
  try {
    const cekTHR = await GetTHRById(THRId);
    if (!cekTHR) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "THR not found",
        data: {}
      });
    }

    const validatedFields = await THRUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const updateTHR = await UpdateTHRById(THRId, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "THR successfully updated",
      data: updateTHR
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
    const getOne = await GetTHRById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "THR not found",
        data: {}
      });
    }
    const destroy = await DeleteTHRById(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "THR successfully deleted",
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

const routesTHR = router;

export default routesTHR;
