//@ts-nocheck
import express from "express";
import { GetAppSetting, UpdateAppSetting } from "./appSetting.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const appSetting = await GetAppSetting();

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "App Setting successfully retrieved",
      data: appSetting
    });
  } catch (error) {
    return res.status(500).json({
      status: true,
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
    const updateAppSetting = await UpdateAppSetting(id, data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "App Setting successfully updated",
      data: updateAppSetting
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

const routesAppSetting = router;

export default routesAppSetting;
