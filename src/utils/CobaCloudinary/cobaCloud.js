// @ts-nocheck
import express from "express";
import multer from "multer";

import { DeleteImage, GetPublicId, UploadFileIzin, UploadImageAbsensi } from "../cloudinary.js";
import { isWithinRadius } from "../geolib.js";

const router = express.Router();

router.get("/", async (req, res) => {
  return res.status(200).json({
    status: true,
    statusCode: 200,
    message: "Coba Cloud successfully retrieved",
    data: {}
  });
});

router.post("/", async (req, res) => {
  try {
    const result = await UploadImageAbsensi(req.files.image.tempFilePath);
    // const result = req.files.image.tempFilePath;
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Coba Cloud successfully retrieved",
      data: { result }
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

router.post("/izin", async (req, res) => {
  try {
    const result = await UploadFileIzin(req.files.bukti.tempFilePath);
    // const result = req.files.image.tempFilePath;
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Coba Cloud Izin successfully retrieved",
      data: result
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

router.post("/get-public/", async (req, res) => {
  const { url } = req.body;
  try {
    const result = await GetPublicId(url);
    // const result = req.files.image.tempFilePath;
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Coba Cloud successfully retrieved",
      data: result
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

router.post("/delete", async (req, res) => {
  const { url } = req.body;
  try {
    const getPublicId = GetPublicId(url);

    const result = await DeleteImage(getPublicId);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Coba Cloud successfully deleted",
      data: result
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

router.post("/geolib", async (req, res) => {
  const { userLat, userLong, officeLat, officeLong } = req.body;
  try {
    const result = isWithinRadius(userLat, userLong, officeLat, officeLong, 10);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Coba Cloud successfully deleted",
      data: result
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

const cobaCloud = router;

export default cobaCloud;
