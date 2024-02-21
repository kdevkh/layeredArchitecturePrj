import { jest } from "@jest/globals";
import { UsersController } from "../../../src/controllers/users.controller.js";

const mockUsersService = {
  createUser: jest.fn(),
  signUser: jest.fn(),
  myProfile: jest.fn(),
};

const mockRequest = {
  body: jest.fn(),
};

const mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
  cookie: jest.fn(),
};

const mockNext = jest.fn();

const usersController = new UsersController(mockUsersService);

describe("Users Controller Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockResponse.status.mockReturnValue(mockResponse);
  });

  test("createUser Method By Success", async () => {
    const reqBody = {
      email: "test@example.com",
      password: "123123",
      passwordConfirm: "123123",
      name: "Test User",
      grade: "user",
    };
    mockRequest.body = reqBody;

    const createdUser = {
      userId: 1,
      ...reqBody,
      createdAt: new Date(),
    };
    mockUsersService.createUser.mockReturnValue(createdUser);

    await usersController.createUser(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.createUser).toHaveBeenCalledWith(
      reqBody.email,
      reqBody.password,
      reqBody.name,
      reqBody.grade
    );
    expect(mockUsersService.createUser).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);

    expect(mockResponse.json).toHaveBeenCalledWith({ data: createdUser });
  });

  test("signUser Method By Success", async () => {
    const reqBody = {
      email: "test@example.com",
      password: "123123",
    };
    mockRequest.body = reqBody;

    const signedUser = {
      userId: 1,
      email: reqBody.email,
      name: "Test User",
      createdAt: new Date(),
    };
    mockUsersService.signUser.mockReturnValue(signedUser);

    // await usersController.signUser(mockRequest, mockResponse, mockNext);
    const test = await usersController.signUser(
      mockRequest,
      mockResponse,
      mockNext
    ); // 사실 이놈을 검증해야 함 (== mock 검증이나 비슷하긴 함;;) 의미를 이해하셈

    expect(mockUsersService.signUser).toHaveBeenCalledWith(
      reqBody.email,
      reqBody.password
    );
    expect(mockUsersService.signUser).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);

    expect(mockResponse.json).toHaveBeenCalledWith({
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
    });
  });

  test("myProfile Method By Success", async () => {
    const userProfile = {
      userId: 1,
      email: "test@example.com",
      name: "Test User",
      createdAt: new Date(),
    };
    mockUsersService.myProfile.mockReturnValue(userProfile);

    mockResponse.locals = { user: { userId: 1 } };

    await usersController.myProfile(mockRequest, mockResponse, mockNext);

    expect(mockUsersService.myProfile).toHaveBeenCalledWith(
      mockResponse.locals.user.userId
    );
    expect(mockUsersService.myProfile).toHaveBeenCalledTimes(1);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.status).toHaveBeenCalledTimes(1);

    expect(mockResponse.json).toHaveBeenCalledWith({ data: userProfile });
  });
});
