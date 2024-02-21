import { UsersService } from "../services/users.service.js";
import jwtwebToken from "jsonwebtoken";

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  createUser = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name, grade } = req.body;

      if (!email || !password || !passwordConfirm || !name) {
        throw new Error("InvalidParamsError");
      }
      if (password !== passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: "비밀번호와 비밀번호 확인값이 일치하지 않습니다.",
        });
      }
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "비밀번호는 최소 6자 이상입니다.",
        });
      }

      const createdUser = await this.usersService.createUser(
        email,
        password,
        name,
        grade
      );

      return res.status(201).json({ data: createdUser });
    } catch (err) {
      next(err);
    }
  };

  signUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("InvalidParamsError");
      }

      const user = await this.usersService.signUser(email, password);

      const accessToken = jwtwebToken.sign(
        { userId: user.userId },
        "resume@#",
        { expiresIn: "12h" }
      );

      const refreshToken = jwtwebToken.sign(
        { userId: user.userId },
        "resume&%*",
        { expiresIn: "7d" }
      );

      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);

      return res.status(200).json({ accessToken, refreshToken });
    } catch (err) {
      next(err);
    }
  };

  myProfile = async (req, res, next) => {
    try {
      const user = res.locals.user;

      const userProfile = await this.usersService.myProfile(user.userId);

      return res.status(200).json({ data: userProfile });
    } catch (err) {
      next(err);
    }
  };
}
