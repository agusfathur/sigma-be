//@ts-nocheck
import express from "express";
import { CreateJabatan, DeleteJabatan, GetAllJabatan, GetJabatanById, UpdateJabatan } from "./jabatan.service.js";
import { JabatanCreateSchema, JabatanUpdateSchema } from "./jabatan.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllJabatan();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jabatan successfully retrieved",
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
    const data = await GetJabatanById(id);
    if (data.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jabatan not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jabatan successfully retrieved",
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
    const validatedFields = JabatanCreateSchema.safeParse(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateJabatan(validatedFields.data);

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Jabatan successfully created",
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
    const getOne = await GetJabatanById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jabatan not found",
        data: {}
      });
    }
    const validatedFields = JabatanUpdateSchema.safeParse(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateJabatan(id, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jabatan successfully updated",
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
    const getOne = await GetJabatanById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Jabatan not found",
        data: {}
      });
    }
    const destroy = await DeleteJabatan(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Jabatan successfully deleted",
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

const routesJabatan = router;
export default routesJabatan;
