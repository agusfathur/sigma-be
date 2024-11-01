// @ts-nocheck
import express from "express";
import {
  CreateTunjanganBonus,
  DestroyTunjanganBonus,
  GetAllTunjanganBonus,
  GetAllTunjanganBonusByCreatedAt,
  GetTunjanganBonusById,
  GetTunjanganBonusByPegawaiId,
  UpdateTunjanganBonus
} from "./tunjanganBonus.service.js";
import { TunjanganBonusCreateSchema, TunjanganBonusUpdateSchema } from "./tunjanganBonus.validation.js";
import { prisma } from "../utils/prisma.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await GetAllTunjanganBonus();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Bonus successfully retrieved",
      data
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

router.get("/search", async (req, res) => {
  const tanggalDari = req.query.tanggal_dari;
  const tanggalSampai = req.query.tanggal_sampai;

  try {
    const data = await GetAllTunjanganBonusByCreatedAt(tanggalDari, tanggalSampai);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Bonus successfully retrieved",
      data: { tanggalDari, tanggalSampai: new Date(tanggalSampai), data }
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
    const getOne = await GetTunjanganBonusById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Bonus not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Bonus successfully retrieved",
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

router.get("/pegawai/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const getOne = await GetTunjanganBonusByPegawaiId(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Bonus not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Bonus successfully retrieved",
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
    const validatedFields = await TunjanganBonusCreateSchema.safeParseAsync(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.issues[0].message,
        data: {}
      });
    }
    const create = await CreateTunjanganBonus(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Tunjangan Bonus successfully created",
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
    const getOne = await GetTunjanganBonusById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Bonus not found",
        data: {}
      });
    }

    const validatedFields = await TunjanganBonusUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.issues[0].message,
        data: {}
      });
    }
    const update = await UpdateTunjanganBonus(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Bonus successfully updated",
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
    const getOne = await GetTunjanganBonusById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Bonus not found",
        data: {}
      });
    }
    const destroy = await DestroyTunjanganBonus(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Bonus successfully deleted",
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

const routesTunjanganBonus = router;
export default routesTunjanganBonus;
