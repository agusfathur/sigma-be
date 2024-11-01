// @ts-nocheck
import express from "express";
import {
  CreateTunjanganTetap,
  DeleteTunjanganTetap,
  GetAllTunjanganTetap,
  GetTunjanganTetapById,
  UpdateTunjanganTetap
} from "./tunjanganTetap.service.js";
import { TunjanganTetapCreateSchema, TunjanganTetapUpdateSchema } from "./tunjanganTetap.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllTunjanganTetap();
    if (!getAll) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Tetap not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap successfully retrieved",
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
    const getOne = await GetTunjanganTetapById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Tetap not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap successfully retrieved",
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

  const validatedFields = TunjanganTetapCreateSchema.safeParse(body);
  if (!validatedFields.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: validatedFields.error.flatten().fieldErrors,
      data: {}
    });
  }

  try {
    const update = await CreateTunjanganTetap(validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap successfully created",
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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const getOne = await GetTunjanganTetapById(id);
  if (getOne.length === 0) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Tunjangan Tetap not found",
      data: {}
    });
  }

  const validatedFields = TunjanganTetapUpdateSchema.safeParse(body);
  if (!validatedFields.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: validatedFields.error.flatten().fieldErrors,
      data: {}
    });
  }

  try {
    const update = await UpdateTunjanganTetap(id, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap successfully updated",
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
  const getOne = await GetTunjanganTetapById(id);

  if (getOne.length === 0) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Tunjangan Tetap not found",
      data: {}
    });
  }
  try {
    const destroy = await DeleteTunjanganTetap(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap successfully deleted",
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

const routesTunjanganTetap = router;
export default routesTunjanganTetap;
