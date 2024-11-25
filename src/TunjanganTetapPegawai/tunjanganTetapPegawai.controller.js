// @ts-nocheck
import express from "express";
import {
  CreateManyTunjanganTetapPegawai,
  CreateTunjanganTetapPegawai,
  DeleteTunjanganTetapPegawai,
  GetAllTunjanganTetapPegawai,
  GetTunjanganTetapPegawaiById,
  GetTunjanganTetapPegawaiByPegawaiId,
  UpdateTunjanganTetapPegawai
} from "./tunjanganTetapPegawai.service.js";
import {
  TunjanganTetapPegawaiCreateManySchema,
  TunjanganTetapPegawaiOneCreateSchema,
  TunjanganTetapPegawaiOneUpdateSchema,
  TunjanganTetapPegawaiUpdateManySchema
} from "./tunjanganTetapPegawai.validation.js";
import e from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await GetAllTunjanganTetapPegawai();
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap Pegawai successfully retrieved",
      data
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
    const getOne = await GetTunjanganTetapPegawaiById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Tetap Pegawai not found",
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap Pegawai successfully retrieved",
      data: getOne
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
  const id = req.params.id;

  try {
    const getAll = await GetTunjanganTetapPegawaiByPegawaiId(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap Pegawai By  successfully retrieved",
      data: getAll
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

  if (Array.isArray(data)) {
    try {
      const validatedFields = await TunjanganTetapPegawaiCreateManySchema.safeParseAsync(data);
      if (!validatedFields.success) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: validatedFields.error.flatten().fieldErrors,
          data: {}
        });
      }
      const create = await CreateManyTunjanganTetapPegawai(data);
      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Tunjangan Tetap Pegawai successfully created",
        data: create
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message || "Internal Server Error",
        data: {}
      });
    }
  } else {
    try {
      const validatedFields = await TunjanganTetapPegawaiOneCreateSchema.safeParseAsync(data);
      if (!validatedFields.success) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: validatedFields.error.flatten().fieldErrors,
          data: {}
        });
      }
      const create = await CreateTunjanganTetapPegawai(data);
      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Tunjangan Tetap Pegawai successfully created",
        data: create
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message || "Internal Server Error",
        data: {}
      });
    }
  }
});

router.put("/", async (req, res) => {
  const data = req.body;

  if (Array.isArray(data)) {
    try {
      const validatedFields = await TunjanganTetapPegawaiUpdateManySchema.safeParseAsync(data);
      if (!validatedFields.success) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: validatedFields.error.flatten().fieldErrors,
          data: {}
        });
      }
      const update = await validatedFields.data.map((item) =>
        UpdateTunjanganTetapPegawai(item.id_tunjangan_tetap_pegawai, item)
      );
      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Tunjangan Tetap Pegawai successfully created",
        data: update.map((item) => item)
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        statusCode: 500,
        message: error.message || "Internal Server Error",
        data: {}
      });
    }
  } else {
    try {
      const validatedFields = await TunjanganTetapPegawaiOneUpdateSchema.safeParseAsync(data);
      if (!validatedFields.success) {
        return res.status(400).json({
          status: false,
          statusCode: 400,
          message: validatedFields.error.flatten().fieldErrors,
          data: {}
        });
      }
      const update = await UpdateTunjanganTetapPegawai(data.id_tunjangan_tetap_pegawai, data);
      return res.status(201).json({
        status: true,
        statusCode: 201,
        message: "Tunjangan Tetap Pegawai successfully created",
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
  }
});
router.put("/:id", async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    const validatedFields = await TunjanganTetapPegawaiOneUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateTunjanganTetapPegawai(id, data);
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Tunjangan Tetap Pegawai successfully created",
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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const getOne = await GetTunjanganTetapPegawaiById(id);
    if (getOne.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Tunjangan Tetap Pegawai not found",
        data: {}
      });
    }
    const destroy = await DeleteTunjanganTetapPegawai(id);

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Tunjangan Tetap Pegawai successfully deleted",
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

const routesTunjanganTetapPegawai = router;

export default routesTunjanganTetapPegawai;
