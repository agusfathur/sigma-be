//@ts-nocheck
import express from "express";
import {
  CreateKategoriLibur,
  DeleteKategoriLibur,
  GetAllKategoriLibur,
  GetKategoriLiburById,
  UpdateKategoriLibur
} from "./kategoriLibur.service.js";
import { KategoriLiburCreateSchema, KategoriLiburUpdateSchema } from "./kategoriLibur.validation.js";
import { getKategoriLiburById } from "./kategoriLibur.repository.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllKategoriLibur();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Kategori Libur successfully retrieved",
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
    const getOne = await GetKategoriLiburById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Kategori Libur not found",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Kategori Libur successfully retrieved",
      data: getOne
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
    const validatedFields = KategoriLiburCreateSchema.safeParse(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const create = await CreateKategoriLibur(validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Kategori Libur successfully created",
      data: create
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 200,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.put("/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    const getOne = await GetKategoriLiburById(id);

    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Kategori Libur not found",
        data: {}
      });
    }
    const validatedFields = KategoriLiburUpdateSchema.safeParse(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateKategoriLibur(id, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Kategori Libur successfully updated",
      data: update
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
      statusCode: 200,
      message: error.message,
      data: {}
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const getOne = await GetKategoriLiburById(id);

    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Kategori Libur not found",
        data: {}
      });
    }
    const deleteKategoriLibur = await DeleteKategoriLibur(id);
    if (!deleteKategoriLibur) {
      return res.status(400).json({
        status: true,
        statusCode: 400,
        message: "Kategori Libur successfully Deleted",
        data: getOne
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Kategori Libur successfully Deleted",
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

const routesKategoriLibur = router;
export default routesKategoriLibur;
