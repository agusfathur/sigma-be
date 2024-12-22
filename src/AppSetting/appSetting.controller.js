//@ts-nocheck
import express from "express";
import { GetAppSetting, UpdateAppSetting } from "./appSetting.service.js";
import { validateImage } from "../utils/cloudinary.js";
import { VerifyToken } from "../Auth/auth.service.js";

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

router.put("/:id", VerifyToken, async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    let validatedImage;
    if (req.files?.logo_sistem) {
      const image = req.files?.logo_sistem;
      validatedImage = validateImage(image);
      if (!validatedImage.status) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: validatedImage.message,
          data: {}
        });
      }
      data.logo_sistem = validatedImage.data.path;
    } else {
      validatedImage = {
        status: true
      };
    }

    const updateAppSetting = await UpdateAppSetting(id, data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "App Setting successfully updated",
      data: updateAppSetting
    });
  } catch (error) {
    console.log(error);
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
