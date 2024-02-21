import { TokenService } from "../services/token.service.js";

export class TokenController {
  constructor() {
    this.tokenService = new TokenService();
    this.refreshToken = this.refreshToken.bind(this);
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        throw new Error("Refresh token not provided");
      }

      const accessToken = await this.tokenService.refreshAccessToken(
        refreshToken
      );

      res.cookie("accessToken", accessToken);

      return res.status(200).json({ accessToken });
    } catch (err) {
      next(err);
    }
  }
}
