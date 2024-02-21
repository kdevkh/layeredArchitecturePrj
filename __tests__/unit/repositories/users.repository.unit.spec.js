import { jest } from "@jest/globals";
import { UsersRepository } from "../../../src/repositories/users.repository";

let mockPrisma = {
  users: {
    create: jest.fn(),
    findFirst: jest.fn(),
  },
};

let usersRepository = new UsersRepository(mockPrisma);

describe("Users Repository Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("createUser Method", async () => {
    const mockReturn = "create User Return String";
    mockPrisma.users.create.mockReturnValue(mockReturn);

    const createUserParams = {
      email: "createUserEmail",
      password: "createUserPassword",
      name: "createUserName",
      grade: "user",
    };

    const createUserData = await usersRepository.createUser(
      createUserParams.email,
      createUserParams.password,
      createUserParams.name,
      createUserParams.grade
    );

    expect(createUserData).toBe(mockReturn);

    expect(mockPrisma.users.create).toHaveBeenCalledTimes(1);

    expect(mockPrisma.users.create).toHaveBeenCalledWith({
      data: createUserParams,
    });
  });

  test("signInByEmailPassword Method", async () => {
    const mockReturn = "findFirst String";
    mockPrisma.users.findFirst.mockReturnValue(mockReturn);

    const users = await usersRepository.signInByEmailPassword();

    expect(usersRepository.prisma.users.findFirst).toHaveBeenCalledTimes(1);

    expect(users).toBe(mockReturn);
  });

  test("getMyProfile Method", async () => {
    const mockReturn = "findFirst String";
    mockPrisma.users.findFirst.mockReturnValue(mockReturn);

    const users = await usersRepository.getMyProfile();

    expect(usersRepository.prisma.users.findFirst).toHaveBeenCalledTimes(1);

    expect(users).toBe(mockReturn);
  });
});
