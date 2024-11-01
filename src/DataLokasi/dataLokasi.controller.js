// @ts-nocheck
import express from "express";
import {
  CreateDataLokasi,
  DeleteDataLokasi,
  GetAllDataLokasi,
  GetDataLokasiById,
  UpdateDataLokasi
} from "./dataLokasi.service.js";
import { DataLokasiCreateSchema, DataLokasiUpdateSchema } from "./dataLokasi.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllDataLokasi();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Lokasi successfully retrieved",
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
    const data = await GetDataLokasiById(id);
    if (data.legth === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Data Lokasi not found",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Lokasi successfully retrieved",
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

  try {
    const validatedFields = DataLokasiCreateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateDataLokasi(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Data Lokasi successfully created",
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
    const getOne = await GetDataLokasiById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Data Lokasi not found",
        data: {}
      });
    }

    const validatedFields = DataLokasiUpdateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateDataLokasi(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Lokasi successfully updated",
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
    const getOne = await GetDataLokasiById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Data Lokasi not found",
        data: {}
      });
    }
    const destroy = await DeleteDataLokasi(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Lokasi successfully deleted",
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
const routesDataLokasi = router;

export default routesDataLokasi;
