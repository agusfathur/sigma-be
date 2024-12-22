// @ts-nocheck
import express from "express";
import { findAllUser, insertUser } from "./user.repository.js";
import {
  CreateUser,
  DeleteUserById,
  GetAllUser,
  GetAllUserByRole,
  GetUserById,
  UpdateUserById,
  UpdateUserPassword
} from "./user.service.js";
import { UserCreateSchema, UserUpdateSchema } from "./user.validation.js";
import { validateImage } from "../utils/cloudinary.js";

const router = express.Router();

// Get All User
router.get("/", async (req, res) => {
  let userAll;
  const query = req.query;
  try {
    if (query.role) {
      userAll = await GetAllUserByRole(query.role);
    } else {
      userAll = await GetAllUser();
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Users successfully retrieved",
      data: userAll
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

// Get One User By Id
router.get("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const getOneUser = await GetUserById(userId);

    if (!getOneUser) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "User not found",
        data: {}
      });
    }

    return res.status(200).json({
      status: false,
      statusCode: 400,
      message: "User successfully retrieved",
      data: getOneUser
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
    const validatedImage = validateImage(req.files?.image);
    const validatedFields = await UserCreateSchema.safeParseAsync(data);

    if (!validatedFields.success || !validatedImage.status) {
      return res.status(20).json({
        status: false,
        statusCode: 400,
        message: { ...validatedFields?.error?.flatten()?.fieldErrors, ...validatedImage?.message },
        data: {}
      });
    }

    validatedFields.data.image = validatedImage.data.path;
    const result = await CreateUser(validatedFields.data);

    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "User created successfully",
      data: result
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

// Update User
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const getOneUser = await GetUserById(userId);

    if (!getOneUser) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
        data: {}
      });
    }
    data.userId = userId;

    const validatedFields = await UserUpdateSchema.safeParseAsync(data);

    let validatedImage;
    if (req.files?.image) {
      const image = req.files?.image;
      validatedImage = validateImage(image);
      validatedFields.data.image = validatedImage.data.path;
    } else {
      validatedImage = {
        status: true
      };
    }

    if (!validatedFields.success || !validatedImage.status) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: { ...validatedFields.error.flatten().fieldErrors, ...validatedImage.message },
        data: {}
      });
    }

    const update = await UpdateUserById(userId, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "User successfully updated",
      data: update
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

// Delete User
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const getOneUser = await GetUserById(userId);

    if (getOneUser.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
        data: {}
      });
    }
    const deleteUser = await DeleteUserById(userId);
    res.status(200).json({
      status: false,
      statusCode: 200,
      message: "User successfully deleted",
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

router.post("/change-password/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const getOneUser = await GetUserById(userId);
    if (getOneUser.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
        data: {}
      });
    }
    const update = await UpdateUserPassword(userId, data.password);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "User successfully updated",
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

router.post("/change-username/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const getOneUser = await GetUserById(userId);
    if (getOneUser.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "User not found",
        data: {}
      });
    }
    const validatedFields = await UserUpdateSchema.safeParseAsync(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const update = await UpdateUserById(userId, validatedFields.data);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "User successfully updated",
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

const routesUser = router;

export default routesUser;
