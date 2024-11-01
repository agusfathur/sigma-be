// @ts-nocheck
import express from "express";
import {
  CreatePotongGaji,
  DeletePotongGajiById,
  GetAllPotongGaji,
  GetAllPotongGajiByPegawai,
  GetPotongGajiById,
  UpdatePotongGajiById
} from "./potongGaji.service.js";
import { PotongGajiCreateSchema, PotongGajiUpdateSchema } from "./potongGaji.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const potongGaji = await GetAllPotongGaji();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Potong Gaji successfully retrieved",
      data: potongGaji
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
    const potongGaji = await GetPotongGajiById(id);
    if (!potongGaji) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Potong Gaji not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Potong Gaji successfully retrieved",
      data: potongGaji
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
    const potongGaji = await GetAllPotongGajiByPegawai(pegawaiId);
    if (potongGaji.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Potong Gaji By Pegawai not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Potong Gaji By Pegawai successfully retrieved",
      data: potongGaji
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
    const validatedFields = await PotongGajiCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const createPotongGaji = await CreatePotongGaji(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Potong Gaji successfully created",
      data: createPotongGaji
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
  const potongGajiId = req.params.id;
  const data = req.body;
  try {
    const cekPotongGaji = await GetPotongGajiById(potongGajiId);
    if (!cekPotongGaji) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Potong Gaji not found",
        data: {}
      });
    }

    const validatedFields = await PotongGajiUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const updatePotongGaji = await UpdatePotongGajiById(potongGajiId, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Potong Gaji successfully updated",
      data: updatePotongGaji
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
    const getOne = await GetPotongGajiById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Potong Gaji not found",
        data: {}
      });
    }
    const destroy = await DeletePotongGajiById(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Potong Gaji successfully deleted",
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

const routesPotongGaji = router;

export default routesPotongGaji;
