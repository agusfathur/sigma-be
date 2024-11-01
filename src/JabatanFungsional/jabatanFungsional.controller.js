//@ts-nocheck
import express from "express";
import {
  CreateJabatanFungsional,
  DeleteJabatanFungsional,
  GetAllJabatanFungsional,
  GetJabatanFungsionalById,
  UpdateJabatanFungsional
} from "./jabatanFungsional.service.js";
import { JabatanFungsionalCreateSchema, JabatanFungsionalUpdateSchema } from "./jabatanFungsional.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await GetAllJabatanFungsional();

    return res.status(200).json({
      status: false,
      statusCode: 200,
      message: "Jabatan Fungsional successfully retrieved",
      data: data
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await GetJabatanFungsionalById(id);
    if (data.length === 0) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Jabatan Fungsional not found",
        data: {}
      });
    }

    return res.status(200).json({
      status: false,
      statusCode: 200,
      message: "Jabatan Fungsional successfully retrieved",
      data: data
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.post("/", async (req, res) => {
  const body = req.body;

  try {
    const validatedFields = JabatanFungsionalCreateSchema.safeParse(body);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const data = await CreateJabatanFungsional(validatedFields.data);

    return res.status(200).json({
      status: false,
      statusCode: 200,
      message: "Jabatan Fungsional successfully created",
      data: data
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  try {
    const getOne = await GetJabatanFungsionalById(id);
    if (getOne.length === 0) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Jabatan Fungsional not found",
        data: {}
      });
    }

    const validatedFields = JabatanFungsionalUpdateSchema.safeParse(body);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateJabatanFungsional(id, validatedFields.data);

    return res.status(200).json({
      status: false,
      statusCode: 200,
      message: "Jabatan Fungsional successfully retrieved",
      data: update
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const getOne = await GetJabatanFungsionalById(id);
    if (getOne.length === 0) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Jabatan Fungsional not found",
        data: {}
      });
    }

    const data = await DeleteJabatanFungsional(id);

    return res.status(200).json({
      status: false,
      statusCode: 200,
      message: "Jabatan Fungsional successfully deleted",
      data: {}
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: error.message || "Internal Server Error",
      data: {}
    });
  }
});

const routesJabatanFungsionalController = router;
export default routesJabatanFungsionalController;
