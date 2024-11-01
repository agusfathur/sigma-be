// @ts-nocheck
import express from "express";
import { CreateSettingGaji, DeleteSettingGaji, GetSettingGaji, UpdateSettingGaji } from "./settingGaji.service.js";
import { SettingGajiCreateSchema, SettingGajiUpdateSchema } from "./settingGaji.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const get = await GetSettingGaji();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Setting Gaji successfully retrieved",
      data: get
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
  try {
    const data = req.body;

    const validationFields = SettingGajiCreateSchema.safeParse(data);
    if (!validationFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validationFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const create = await CreateSettingGaji(validationFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Setting Gaji successfully created",
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

router.put("/", async (req, res) => {
  try {
    const data = req.body;
    const get = await GetSettingGaji();

    const validatedFields = SettingGajiUpdateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const update = await UpdateSettingGaji(get.id_setting_gaji, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Setting Gaji successfully updated",
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
    const getOne = await GetSettingGaji();
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Setting Gaji not found",
        data: {}
      });
    }
    const deleteData = await DeleteSettingGaji(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Setting Gaji successfully deleted",
      data: deleteData
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

const routesSettingGaji = router;

export default routesSettingGaji;
