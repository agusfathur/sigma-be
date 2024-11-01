import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GetUserByIdExclude, GetUserByUsername, UpdateUserById } from "../User/user.service.js";
import { getUserByRefreshToken } from "./auth.repository.js";
import { updateUserById } from "../User/user.repository.js";

export const GetUserToken = async (refreshToken) => {
  const user = await getUserByRefreshToken(refreshToken);
  return user;
};

export const LoginUser = async (dataUsername, dataPassword) => {
  const user = await GetUserByUsername(dataUsername);
  if (!user) {
    return {
      status: false,
      statusCode: 404,
      message: "User not found",
      data: {}
    };
  }
  const isPasswordMatch = bcrypt.compareSync(dataPassword, user.password);
  if (!isPasswordMatch) {
    return {
      status: false,
      statusCode: 401,
      message: "Invalid Password",
      data: {}
    };
  }
  const { id_user: userId, username, email, name, role } = user;

  const accessToken = jwt.sign({ userId, username, email, name, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s"
  });

  const refreshToken = jwt.sign({ userId, username, email, name, role }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d"
  });

  await UpdateUserById(userId, { refresh_token: refreshToken });

  const userData = await GetUserByIdExclude(userId);
  return {
    status: true,
    statusCode: 200,
    message: "Login success",
    data: { user: userData, accessToken, refreshToken }
  };
};

export const LogoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken)
    return {
      status: false,
      statusCode: 204,
      message: "Refresh token not found",
      data: {}
    };
  const user = await getUserByRefreshToken(refreshToken);
  if (!user) {
    res.clearCookie("refreshToken");
    return {
      status: false,
      statusCode: 204,
      message: "User not found",
      data: {}
    };
  }

  await updateUserById(user.id_user, { refresh_token: null });
  res.clearCookie("refreshToken");

  return {
    status: true,
    statusCode: 200,
    message: "Logout success",
    data: {}
  };
};

// Refresh Token membuat token baru ketika sudah login & ada cookie  refreshToken
// export const RefreshAccessToken = async (refreshToken) => {
//   try {
//     // mengambil cookie refreshToken
//     // unauthorized : akan mental ke halaman sebelumnya / halaman tertentu
//     if (!refreshToken) {
//       return {
//         status: false,
//         statusCode: 401,
//         message: "Unauthorized",
//         data: {}
//       };
//     }
//     const user = await getUserByRefreshToken(refreshToken);
//     if (!user) {
//       return {
//         status: false,
//         statusCode: 404,
//         message: "User not found",
//         data: {}
//       };
//     }
//     // buat accessToken baru
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
//       // Jika terjadi kesalahan dalam verifikasi token, langsung kirimkan status 403 dengan pesan error
//       if (err) {
//         return res.status(403).json({
//           status: false,
//           statusCode: 403,
//           message: err.message,
//           data: {}
//         });
//       }
//       const { id_user: userId, username, email, name, role } = user;

//       const accessToken = jwt.sign({ userId, username, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
//         expiresIn: "1m"
//       });
//       return {
//         status: true,
//         statusCode: 200,
//         message: "Refresh token success",
//         data: accessToken
//       };
//     });
//   } catch (error) {
//     return {
//       status: false,
//       statusCode: 500,
//       message: error.message,
//       data: {}
//     };
//   }
// };

export const RefreshAccessToken = async (refreshToken) => {
  try {
    // Memeriksa apakah refreshToken ada
    if (!refreshToken) {
      return {
        status: false,
        statusCode: 401,
        message: "Unauthorized",
        data: {}
      };
    }

    const user = await getUserByRefreshToken(refreshToken);
    if (!user) {
      return {
        status: false,
        statusCode: 404,
        message: "User not found",
        data: {}
      };
    }

    // Verifikasi refresh token secara asynchronous
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    const { id_user: userId, username, email, name, role } = user;

    // Buat accessToken baru
    const accessToken = jwt.sign({ userId, username, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m"
    });

    return {
      status: true,
      statusCode: 200,
      message: "Refresh token success",
      data: { accessToken }
    };
  } catch (error) {
    // Jika ada error, termasuk dari verifikasi jwt
    return {
      status: false,
      statusCode: error.statusCode || 500,
      message: error.message,
      data: {}
    };
  }
};

// middleware: untuk memverifikasi token / login / authorization
export const VerifyToken = (req, res, next) => {
  // ambil bearer token dari header authorization
  const authHeader = req.headers["authorization"];
  // cek ada, jika ada ambil token, ambil variabel ke 2 karena token ada di index 1
  const token = authHeader && authHeader.split(" ")[1];

  // jika token null, maka unauthorized / tidak login
  if (token === null)
    return res.status(401).json({
      status: false,
      statusCode: 401,
      message: "Unauthorized",
      data: {}
    });

  // verifikasi apakah token valid, mengandung acces token secret dari env
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: err.message,
        data: {}
      });
    next();
  });
};
