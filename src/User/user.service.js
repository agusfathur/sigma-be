// @ts-nocheck
import bcrypt from "bcrypt";
import {
  destroyUser,
  findAllUser,
  findUserByEmail,
  findUserById,
  findUserByIdExclude,
  findUserByUsername,
  insertUser,
  updateUserById
} from "./user.repository.js";

import { prisma } from "../utils/prisma.js";
import { DeleteImage, GetPublicId, UploadImageProfile } from "../utils/cloudinary.js";

export const CreateUser = async (data, prismaInstance = prisma) => {
  const { username, email, password, name, role } = data;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const create = await insertUser(
    {
      username,
      email,
      password: hashedPassword,
      name,
      role
    },
    prismaInstance
  );

  const uploadImage = await UploadImageProfile(data.image);

  await updateUserById(create.id_user, { image: uploadImage.secure_url }, prismaInstance);

  return create;
};
const ChangePassword = async (id, password, prismaInstance = prisma) => {
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const update = await updateUserById(id, { password: hashedPassword }, prismaInstance);
  return update;
};

export const ChangeUsername = async (id, username, prismaInstance = prisma) => {
  const update = await updateUserById(id, { username }, prismaInstance);
  return update;
};

export const GetAllUser = async () => {
  const allUser = await findAllUser();
  return allUser;
};

export const GetAllUserByRole = async (role) => {
  return await findAllUser({ role: { in: role } });
};

export const GetUserById = async (id) => {
  const user = await findUserById(id);
  return user;
};

export const GetUserByIdExclude = async (id) => {
  const user = await findUserByIdExclude(id);
  return user;
};

export const GetUserByUsername = async (username) => {
  const user = await findUserByUsername(username);
  return user;
};

export const UpdateUserRefreshToken = async (id, refreshToken) => {
  const update = await updateUserById(id, { refresh_token: refreshToken });
  return update;
};

export const UpdateUserById = async (id, data, prismaInstance = prisma) => {
  if (data.password) {
    const hashedPassword = await bcrypt.hashSync(data.password, 10);
    data.password = hashedPassword;
  }

  const { userId, image, ...updatedData } = data;

  const update = await updateUserById(id, updatedData, prismaInstance);

  if (image && update.image) {
    const publicId = GetPublicId(update.image);
    await DeleteImage(publicId);

    const uploadImage = await UploadImageProfile(image);

    await updateUserById(id, { image: uploadImage.secure_url }, prismaInstance);
  }

  return update;
};

export const DeleteUserById = async (id, prismaInstance = prisma) => {
  const deleteUser = await destroyUser(id, prismaInstance);
  return deleteUser;
};
