import jwtwebToken from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jwtValidate = async (req, res, next) => {
  try {
    const tokenValue = req.cookies.accessToken;

    if (!tokenValue) {
      throw new Error("인증 정보가 올바르지 않습니다33.");
    }

    const token = jwtwebToken.verify(tokenValue, "resume@#");

    if (!token.userId) {
      throw new Error("인증 정보가 올바르지 않습니다44.");
    }

    const user = await prisma.users.findFirst({
      where: {
        userId: token.userId,
      },
    });

    if (!user) {
      throw new Error("인증 정보가 올바르지 않습니다55.");
    }

    res.locals.user = user;

    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export default jwtValidate;
