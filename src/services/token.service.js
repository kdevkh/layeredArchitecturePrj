import jwtwebToken from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class TokenService {
  async refreshAccessToken(refreshToken) {
    try {
      const decodedToken = jwtwebToken.verify(refreshToken, "resume&%*");

      if (!decodedToken.userId) {
        throw new Error("InvalidRefreshToken");
      }

      const user = await prisma.users.findUnique({
        where: {
          userId: decodedToken.userId,
        },
      });

      if (!user) {
        throw new Error("UserNotfound");
      }

      const accessToken = jwtwebToken.sign(
        { userId: user.userId },
        "resume@#",
        { expiresIn: "12h" }
      );

      return accessToken;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
