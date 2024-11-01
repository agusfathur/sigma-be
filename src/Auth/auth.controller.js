// @ts-nocheck
import express from "express";
import { LoginSchema } from "./auth.validation.js";
import { LoginUser, LogoutUser, RefreshAccessToken, VerifyToken } from "./auth.service.js";
import { getUserByRefreshToken } from "./auth.repository.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const data = req.body;
  try {
    const validatedFields = LoginSchema.safeParse(data);
    if (!validatedFields.success) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: validatedFields.error.flatten().fieldErrors,
        data: {}
      });
    }
    const { username, password } = validatedFields.data;
    const login = await LoginUser(username, password);

    if (!login.status) {
      return res.status(Number(login.statusCode)).json({
        status: login.status,
        statusCode: login.statusCode,
        message: login.message,
        data: {}
      });
    }

    res.cookie("refreshToken", login.data.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false,
      // secure: process.env.NODE_ENV === "production", // Gunakan secure flag hanya di production (HTTPS)
      sameSite: "Strict" // Atau 'Lax' jika Anda ingin memungkinkan beberapa cross-site request
    });
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Login successfully",
      data: login.data
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

router.delete("/logout", async (req, res) => {
  try {
    const logoutUser = await LogoutUser(req, res);

    if (!logoutUser.status) {
      return res.status(Number(logoutUser.statusCode)).json({
        status: logoutUser.status,
        statusCode: logoutUser.statusCode,
        message: logoutUser.message,
        data: {}
      });
    }
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Logout successfully",
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

router.get("/token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const accesToken = await RefreshAccessToken(refreshToken);
    if (!accesToken.status) {
      return res.status(Number(accesToken.statusCode)).json({
        status: accesToken.status,
        statusCode: accesToken.statusCode,
        message: accesToken.message,
        data: {}
      });
    }

    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Refresh token successfully",
      data: accesToken.data
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

router.get("/me", VerifyToken, async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const me = await getUserByRefreshToken(refreshToken);
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Get me successfully",
      data: me
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

const routesLogin = router;
export default routesLogin;
