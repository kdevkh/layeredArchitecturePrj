import express from "express";
import { TokenController } from "../controllers/token.controller.js";

const router = express.Router();
const tokenController = new TokenController();

router.post("/refresh", tokenController.refreshToken);

export default router;
