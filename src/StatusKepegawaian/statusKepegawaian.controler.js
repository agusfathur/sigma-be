// @ts-nocheck
import express from "express";
import {
  CreateStatusKepegawaian,
  DeleteStatusKepegawaian,
  GetAllStatusKepegawaian,
  GetStatusKepegawaianById,
  UpdateStatusKepegawaian
} from "./statusKepegawaian.service.js";
import { StatusKepegawaianCreateSchema, StatusKepegawaianUpdateSchema } from "./statusKepegawaian.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllStatusKepegawaian();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Status Kepegawaian successfully retrieved",
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
    const getOne = await GetStatusKepegawaianById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Status Kepegawaian not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Status Kepegawaian successfully retrieved",
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
  const body = req.body;

  try {
    const validatedFields = StatusKepegawaianUpdateSchema.safeParse(body);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateStatusKepegawaian(validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Status Kepegawaian successfully created",
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

  try {
    const getOne = await GetStatusKepegawaianById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Status Kepegawaian not found",
        data: {}
      });
    }

    const validatedFields = StatusKepegawaianCreateSchema.safeParse(body);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const update = await UpdateStatusKepegawaian(id, validatedFields.data);
    if (!update) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Status Kepegawaian not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Status Kepegawaian successfully updated",
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
    const getOne = await GetStatusKepegawaianById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Status Kepegawaian not found",
        data: {}
      });
    }
    const destroy = await DeleteStatusKepegawaian(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Status Kepegawaian successfully deleted",
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
const routesStatusKepegawaian = router;

export default routesStatusKepegawaian;
