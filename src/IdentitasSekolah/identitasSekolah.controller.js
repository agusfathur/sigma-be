// @ts-nocheck
import express from "express";
import { identitasSekolahSchema } from "./identitasSekolah.validation.js";
import { GetIdentitasSekolah, UpdateIdentitasSekolah } from "./identitasSekolah.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const identitasSekolah = await GetIdentitasSekolah();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Identitas Sekolah successfully retrieved",
      data: identitasSekolah
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

  const validatedFields = await identitasSekolahSchema.safeParseAsync(data);

  if (!validatedFields.success) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: validatedFields.error.flatten().fieldErrors,
      data: {}
    });
  }

  try {
    const update = await UpdateIdentitasSekolah(id, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Identitas Sekolah successfully updated",
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

const routesIdentitasSekolah = router;

export default routesIdentitasSekolah;
