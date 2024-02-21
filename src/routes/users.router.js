import express from "express";
import jwtValidate from "../middlewares/jwtValidate.middleware.js";
import { prisma } from "../utils/prisma/index.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { UsersService } from "../services/users.service.js";
import { UsersController } from "../controllers/users.controller.js";

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
// UsersController의 인스턴스를 생성합니다.
const usersController = new UsersController(usersService);

/** 회원가입 API **/
router.post("/sign-up", usersController.createUser);

/** 로그인 API **/
router.post("/sign-in", usersController.signUser);

/** 프로필 조회 API **/
router.get("/myprofile", jwtValidate, usersController.myProfile);

export default router;
