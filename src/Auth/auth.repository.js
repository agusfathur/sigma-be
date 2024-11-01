import { prisma } from "../utils/prisma.js";
export const getUserByRefreshToken = async (refreshToken) => {
  return await prisma.user.findFirst({
    where: {
      refresh_token: refreshToken
    },
    select: {
      id_user: true,
      name: true,
      username: true,
      email: true,
      role: true,
      refresh_token: true
    }
  });
};
