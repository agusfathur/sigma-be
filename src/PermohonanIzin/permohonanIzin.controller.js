import express from "express";
import {
  CreatePermohonanIzin,
  DestroyPermohonanIzin,
  GetAllPermohonanIzin,
  GetPermohonanIzinById,
  UpdatePermohonanIzin,
  AmbilFormatBukti,
  GetPermohonanIzinByPegawaiId,
  UpdateStatusPermohonanIzin,
  GetIzinByBulanTahunByPegawai,
  GetPermohonanIzinByTanggal,
  GetPermohonanIzinByTahun,
  GetPegawaiSedangIzin
} from "./permohonanIzin.service.js";
import { PermohonanIzinCreateSchema, PermohonanIzinUpdateSchema } from "./permohonanIzin.validartion.js";
import { ValidateFileIzin } from "../utils/cloudinary.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const query = req.query;
  let permohonanIzin;
  try {
    if (query.bulan && query.tahun) {
      permohonanIzin = await GetIzinByBulanTahunByPegawai(query.bulan, query.tahun);
    } else if (query.tanggal) {
      permohonanIzin = await GetPegawaiSedangIzin(query.tanggal);
    } else {
      permohonanIzin = await GetAllPermohonanIzin();
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin successfully retrieved",
      data: permohonanIzin
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
    const permohonanIzin = await GetPermohonanIzinById(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin successfully retrieved",
      data: permohonanIzin
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
  const pegawaiId = req.params.id;
  const query = req.query;
  let permohonanIzin;
  try {
    if (query.bulan && query.tahun) {
      permohonanIzin = await GetIzinByBulanTahunByPegawai(query.bulan, query.tahun, pegawaiId);
    } else if (query.tahun) {
      permohonanIzin = await GetPermohonanIzinByTahun(query.tahun, pegawaiId);
    } else if (query.tanggal) {
      permohonanIzin = await GetPermohonanIzinByTanggal(query.tanggal, pegawaiId);
    } else {
      permohonanIzin = await GetPermohonanIzinByPegawaiId(pegawaiId);
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin successfully retrieved",
      data: permohonanIzin
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
  const bukti = req.files?.bukti;
  data.bukti = bukti.name;
  try {
    const validatedFields = await PermohonanIzinCreateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }

    const validatedFile = ValidateFileIzin(bukti);
    if (!validatedFile) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "File not found",
        data: {}
      });
    }
    const dataCreate = validatedFields.data;
    dataCreate.format_bukti = AmbilFormatBukti(data.bukti);
    dataCreate.bukti = validatedFile.data.path;

    const create = await CreatePermohonanIzin(dataCreate);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin successfully created",
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
  if (req.files?.bukti) {
    data.bukti = req.files?.bukti.name;
  }
  try {
    const getOne = await GetPermohonanIzinById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Permohonan Izin not found",
        data: {}
      });
    }
    const validatedFields = await PermohonanIzinUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    let validatedFile;
    if (data.bukti) {
      const bukti = req.files?.bukti;
      validatedFile = ValidateFileIzin(bukti);
      if (!validatedFile) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: validatedFile.message,
          data: {}
        });
      }
    }
    const dataUpdate = validatedFields.data;
    dataUpdate.format_bukti = AmbilFormatBukti(data.bukti);
    dataUpdate.bukti = validatedFile.data.path;

    const update = await UpdatePermohonanIzin(id, dataUpdate);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin successfully updated",
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

router.put("/status/:id", async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  try {
    const getOne = await GetPermohonanIzinById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Permohonan Izin not found",
        data: {}
      });
    }
    const update = await UpdateStatusPermohonanIzin(id, status);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin status successfully updated",
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
    const getOne = await GetPermohonanIzinById(id);
    if (!getOne) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Permohonan Izin not found",
        data: {}
      });
    }
    const deletePermohonanIzin = await DestroyPermohonanIzin(id);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Permohonan Izin successfully deleted",
      data: { result: "ok" }
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

const routesPermohonanIzin = router;
export default routesPermohonanIzin;
