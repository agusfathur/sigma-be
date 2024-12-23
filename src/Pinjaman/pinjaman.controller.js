// @ts-nocheck
import express from "express";
import {
  CreatePinjaman,
  DeletePinjamanById,
  GetAllPinjaman,
  GetAllPinjamanByBulanTahunStatus,
  GetAllPinjamanByPegawai,
  GetAllPinjamanByPegawaiBulanTahun,
  GetAllPinjamanByPegawaiTanggal,
  GetPinjamanByBulanTahun,
  GetPinjamanById,
  GetPinjamanBytanggal,
  UpdatePinjamanById,
  UpdateStatusPinjamanById
} from "./pinjaman.service.js";
import { PinjamanCreateSchema, PinjamanUpdateSchema } from "./pinjaman.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let pinjaman;
  const query = req.query;
  try {
    if (query.bulan && query.tahun && query.status) {
      pinjaman = GetAllPinjamanByBulanTahunStatus(query.bulan, query.tahun, query.status);
    } else if (query.bulan && query.tahun) {
      pinjaman = await GetPinjamanByBulanTahun(query.bulan, query.tahun);
    } else if (query.tanggal) {
      pinjaman = await GetPinjamanBytanggal(query.tanggal);
    } else {
      pinjaman = await GetAllPinjaman();
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pinjaman successfully retrieved",
      data: pinjaman
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
    const pinjaman = await GetPinjamanById(id);
    if (!pinjaman) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pinjaman not found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pinjaman successfully retrieved",
      data: pinjaman
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

router.get("/pegawai/:id", async (req, res) => {
  const pegawaiId = req.params.id;
  const query = req.query;
  let pinjaman;
  try {
    if (query.bulan && query.tahun && query.status) {
      pinjaman = await GetAllPinjamanByBulanTahunStatus(query.bulan, query.tahun, query.status);
    } else if (query.bulan && query.tahun) {
      pinjaman = await GetAllPinjamanByPegawaiBulanTahun(pegawaiId, query.bulan, query.tahun);
    } else if (query.tanggal) {
      pinjaman = await GetAllPinjamanByPegawaiTanggal(pegawaiId, query.tanggal);
    } else {
      pinjaman = await GetAllPinjamanByPegawai(pegawaiId);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pinjaman By Pegawai successfully retrieved",
      data: pinjaman
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
    const validatedFields = await PinjamanCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const pinjaman = await CreatePinjaman(validatedFields.data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Pinjaman successfully created",
      data: pinjaman
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

router.put("/status/:id", async (req, res) => {
  const data = req.body;
  const pinjamanId = req.params.id;
  try {
    const { status_pinjaman } = data;
    const cekPinjaman = await GetPinjamanById(pinjamanId);
    if (!cekPinjaman) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pinjaman not found",
        data: {}
      });
    }

    const pinjaman = await UpdateStatusPinjamanById(pinjamanId, status_pinjaman);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Pinjaman successfully updated",
      data: pinjaman
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
  const pinjamanId = req.params.id;
  const data = req.body;
  try {
    const cekPinjaman = await GetPinjamanById(pinjamanId);
    if (!cekPinjaman) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pinjaman not found",
        data: {}
      });
    }

    const validatedFields = await PinjamanUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const pinjaman = await UpdatePinjamanById(pinjamanId, validatedFields.data);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pinjaman successfully updated",
      data: pinjaman
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
    const getOne = await GetPinjamanById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Pinjaman not found",
        data: {}
      });
    }
    const destroy = await DeletePinjamanById(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Pinjaman successfully deleted",
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

const routesPinjaman = router;

export default routesPinjaman;
