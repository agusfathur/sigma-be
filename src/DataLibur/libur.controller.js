// @ts-nocheck
import express from "express";
import {
  CreateLibur,
  DeleteLibur,
  GetAllLibur,
  GetAllLiburByBulanTahun,
  GetLiburById,
  UpdateLibur
} from "./libur.service.js";
import { LiburCreateSchema, LiburUpdateSchema } from "./libur.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let getAll;

  const query = req.query;
  try {
    if (query.tahun && query.bulan) {
      getAll = await GetAllLiburByBulanTahun(query.bulan, query.tahun);
    } else if (query.tahun) {
      getAll = await GetLiburByTahun(query.tahun);
    } else {
      getAll = await GetAllLibur();
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Libur successfully retrieved",
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

  const getOne = await GetLiburById(id);
  if (getOne.length === 0) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Data Libur not found",
      data: {}
    });
  }
  try {
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Libur successfully retrieved",
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

  const validatedFields = await LiburCreateSchema.safeParseAsync(data);
  if (!validatedFields.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: validatedFields.error.flatten().fieldErrors,
      data: {}
    });
  }

  try {
    const create = await CreateLibur(validatedFields.data);
    if (!create) {
      return res.status(400).json({
        status: true,
        statusCode: 400,
        message: "Data Libur not created",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Libur successfully created",
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
  const getOne = await GetLiburById(id);
  if (!getOne) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Data Libur not found",
      data: {}
    });
  }
  const validatedFields = await LiburUpdateSchema.safeParseAsync(data);

  if (!validatedFields.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: validatedFields.error.flatten().fieldErrors,
      data: {}
    });
  }

  try {
    const update = await UpdateLibur(id, validatedFields.data);
    if (!update) {
      return res.status(400).json({
        status: true,
        statusCode: 400,
        message: "Data Libur not updated",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Libur successfully updated",
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
  const getOne = await GetLiburById(id);
  if (!getOne) {
    return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Data Libur not found",
      data: {}
    });
  }
  try {
    const destroy = await DeleteLibur(id);
    if (!destroy) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Data Libur not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Data Libur successfully deleted",
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

const routesLibur = router;
export default routesLibur;
