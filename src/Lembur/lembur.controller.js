// @ts-nocheck
import express from "express";
import {
  CreateLembur,
  DeleteLembur,
  GetALemburByPegawaiAndBulanTahun,
  GetAllLembur,
  GetAllLemburByBulanTahun,
  GetAllLemburByPegawai,
  GetAllLemburByStatus,
  GetAllLemburByTanggal,
  GetLemburById,
  GetLemburByTanggalStatus,
  GetLemburPegawaiByPegawaiTanggal,
  GetLemburPegawaiByTanggal,
  UpdateLembur,
  UpdateStatusLemburPegawai
} from "./lembur.service.js";
import { LemburCreateSchema, LemburUpdateSchema } from "./lembur.validation.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let getAll;
  const query = req.query;
  try {
    if (query.bulan && query.tahun && query.status) {
      getAll = await GetAllLemburByStatus(query.bulan, query.tahun, query.status);
    } else if (query.tanggal && query.status) {
      getAll = await GetLemburByTanggalStatus(query.tanggal, query.status);
    } else if (query.tanggal) {
      getAll = await GetAllLemburByTanggal(query.tanggal);
    } else if (query.bulan && query.tahun) {
      getAll = await GetAllLemburByBulanTahun(query.bulan, query.tahun);
    } else {
      getAll = await GetAllLembur();
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully retrieved",
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
    const data = await GetLemburById(id);
    if (!data) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Lembur Not Found",
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully retrieved",
      data
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

router.get("/pegawai/:id", async (req, res) => {
  const id = req.params.id;
  const query = req.query;
  let data;
  try {
    if (query.bulan && query.tahun) {
      data = await GetALemburByPegawaiAndBulanTahun(id, query.bulan, query.tahun);
    } else if (query.tanggal) {
      data = await GetLemburPegawaiByPegawaiTanggal(id, query.tanggal);
    } else {
      data = await GetAllLemburByPegawai(id);
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully retrieved",
      data
    });
  } catch (error) {
    console.log(error);

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
    const validatedFields = LemburCreateSchema.safeParse(data);

    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const create = await CreateLembur(data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully created",
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

router.put("/status/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const getOne = await GetLemburById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Lembur Not Found",
        data: {}
      });
    }
    const update = await UpdateStatusLemburPegawai(id, data.status_lembur);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully updated",
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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const validatedFields = LemburUpdateSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const getOne = await GetLemburById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Lembur Not Found",
        data: {}
      });
    }
    const update = await UpdateLembur(id, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully updated",
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
    const getOne = await GetLemburById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Lembur Not Found",
        data: {}
      });
    }
    const destroy = await DeleteLembur(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Lembur successfully deleted",
      data: destroy
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

const routesLembur = router;
export default routesLembur;
