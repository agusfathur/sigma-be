// @ts-nocheck

import express from "express";
import {
  CreatePembayaranGaji,
  DeletePembayaranGaji,
  GetAllPembayaranGaji,
  GetPembayaranGajiById,
  GetPembayaranGajiBySlipGajiId,
  UpdatePembayaranGaji
} from "./pembayaranGaji.service.js";
import { pembayaranGajiCreateSchema, pembayaranGajiUpdateSchema } from "./pembayaranGaji.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getPembayaranGaji = await GetAllPembayaranGaji();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pembayaran Gaji successfully retrieved",
      data: getPembayaranGaji
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
    const getPembayaranGaji = await GetPembayaranGajiById(id);
    if (!getPembayaranGaji) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pembayaran Gaji Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pembayaran Gaji successfully retrieved",
      data: getPembayaranGaji
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

router.get("/slip-gaji/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getPembayaranGaji = await GetPembayaranGajiBySlipGajiId(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pembayaran Gaji successfully retrieved",
      data: getPembayaranGaji
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
    const validatedFields = await pembayaranGajiCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreatePembayaranGaji(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Pembayaran Gaji successfully created",
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
    const getOne = await GetPembayaranGajiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pembayaran Gaji Not Found",
        data: {}
      });
    }
    const validatedFields = await pembayaranGajiUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdatePembayaranGaji(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pembayaran Gaji successfully updated",
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
    const getOne = await GetPembayaranGajiById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pembayaran Gaji Not Found",
        data: {}
      });
    }
    const destroy = await DeletePembayaranGaji(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pembayaran Gaji successfully deleted",
      data: destroy
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

const routesPembayaranGaji = router;
export default routesPembayaranGaji;
