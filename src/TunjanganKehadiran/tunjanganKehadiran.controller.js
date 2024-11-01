// @ts-nocheck
import express from "express";
import {
  CreateTunjanganKehadiran,
  DeleteTunjanganKehadiran,
  GetAllTunjanganKehadiran,
  GetTunjanganKehadiranById,
  UpdateTunjanganKehadiran
} from "./tunjanganKehadiran.service.js";
import { TunjanganKehadiranCreateSchema, TunjanganKehadiranUpdateSchema } from "./tunjanganKehadiran.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllTunjanganKehadiran();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Kehadiran successfully retrieved",
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
    const getOne = await GetTunjanganKehadiranById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Kehadiran not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Kehadiran successfully retrieved",
      data: getOne
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 500,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.post("/", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const validatedFields = TunjanganKehadiranCreateSchema.safeParse(body);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateTunjanganKehadiran(validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Kehadiran successfully created",
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
  const body = req.body;

  const getOne = await GetTunjanganKehadiranById(id);
  if (getOne.length === 0) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Tunjangan Kehadiran not found",
      data: {}
    });
  }

  const validatedFields = TunjanganKehadiranUpdateSchema.safeParse(body);
  if (!validatedFields.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: validatedFields.error.flatten().fieldErrors,
      data: {}
    });
  }

  try {
    const update = await UpdateTunjanganKehadiran(id, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Kehadiran successfully updated",
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
    const getOne = await GetTunjanganKehadiranById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Kehadiran not found",
        data: {}
      });
    }
    const destroy = await DeleteTunjanganKehadiran(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Kehadiran successfully deleted",
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

const routesTunjanganKehadiran = router;
export default routesTunjanganKehadiran;
