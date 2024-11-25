// @ts-nocheck

import express from "express";
import {
  CreateShiftKerja,
  DeleteShiftKerja,
  GetAllShiftKerja,
  GetShiftKerjaById,
  UpdateShiftKerja
} from "./shiftKerja.service.js";
import { ShiftKerjaCreateSchema, ShiftKerjaUpdateSchema } from "./shiftKerja.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllShiftKerja();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Shift Kerja successfully retrieved",
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
    const getOne = await GetShiftKerjaById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Shift Kerja not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Shift Kerja successfully retrieved",
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
    const validatedFields = ShiftKerjaCreateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateShiftKerja(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Shift Kerja successfully created",
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
    const getOne = await GetShiftKerjaById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Shift Kerja not found",
        data: {}
      });
    }

    const validatedFields = ShiftKerjaUpdateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateShiftKerja(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Shift Kerja successfully updated",
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
    const getData = await GetShiftKerjaById(id);
    if (!getData) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Shift Kerja not found",
        data: {}
      });
    }

    const destroy = await DeleteShiftKerja(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Shift Kerja successfully deleted",
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

const routesShiftKerja = router;
export default routesShiftKerja;
