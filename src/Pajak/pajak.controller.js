//@ts-nocheck
import express from "express";
import { CreatePajak, DeletePajak, GetAllPajak, GetPajakById, UpdatePajak } from "./pajak.service.js";
import { PajakCreateSchema, PajakUpdateSchema } from "./pajak.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const getAll = await GetAllPajak();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pajak successfully retrieved",
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
    const getData = await GetPajakById(id);
    if (getData.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pajak not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pajak successfully retrieved",
      data: getData
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
    const validatedFields = await PajakCreateSchema.safeParseAsync(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreatePajak(validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pajak successfully created",
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
    const getData = await GetPajakById(id);
    if (getData.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pajak not found",
        data: {}
      });
    }

    const validatedFields = await PajakUpdateSchema.safeParseAsync(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdatePajak(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pajak successfully retrieved",
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
    const getData = await GetPajakById(id);
    if (getData.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pajak not found",
        data: {}
      });
    }

    const update = await DeletePajak(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pajak successfully deleted",
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

const routesPajak = router;
export default routesPajak;
