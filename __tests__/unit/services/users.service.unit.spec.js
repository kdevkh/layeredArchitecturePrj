import { jest } from "@jest/globals";
import { UsersService } from "../../../src/services/users.service.js";

let mockUsersRepository = {
  createUser: jest.fn(),
  signInByEmailPassword: jest.fn(),
  getMyProfile: jest.fn(),
};

let usersService = new UsersService(mockUsersRepository);

describe("Users Service Unit Test", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("createUser Method By Success", async () => {
    const userData = {
      email: "test@example.com",
      password: "123123",
      name: "Test User",
      grade: "user",
      createdAt: new Date(),
    };

    // repository가 createUser를 호출하면 생성된 유저를 반환하도록 설정
    mockUsersRepository.createUser.mockReturnValue(userData);

    // 서비스를 호출하고 테스트 유저 데이터를 생성하는지 확인
    const createdUser = await usersService.createUser(
      userData.email,
      userData.password,
      userData.name,
      userData.grade
    );

    // 서비스가 createUser를 호출했는지 확인
    expect(mockUsersRepository.createUser).toHaveBeenCalledWith(
      userData.email,
      userData.password,
      userData.name,
      userData.grade
    );

    // 반환된 유저 데이터가 올바른지 확인
    expect(createdUser).toEqual({
      userId: userData.userId,
      email: userData.email,
      name: userData.name,
      grade: userData.grade,
      createdAt: userData.createdAt,
    });

    expect(mockUsersRepository.createUser).toHaveBeenCalledTimes(1);
  });

  test("signUser Method By Success", async () => {
    const userData = {
      userId: 1,
      email: "test@example.com",
      name: "Test User",
      createdAt: new Date(),
    };

    // mock repository가 signUser를 호출하면 test 유저를 반환하도록 설정
    mockUsersRepository.signInByEmailPassword.mockReturnValue(userData);

    // 서비스를 호출하고 test 유저 데이터를 반환하는지 확인
    const signedUser = await usersService.signUser(userData.email, "123123");

    // 서비스가 signUser를 호출했는지 확인
    expect(mockUsersRepository.signInByEmailPassword).toHaveBeenCalledWith(
      userData.email,
      "123123"
    );

    // 반환된 유저 데이터가 올바른지 확인
    expect(signedUser).toEqual({
      userId: userData.userId,
      email: userData.email,
      name: userData.name,
      createdAt: userData.createdAt,
    });

    expect(mockUsersRepository.signInByEmailPassword).toHaveBeenCalledTimes(1);
  });

  test("myProfile Method By Success", async () => {
    const userId = 1;
    const userData = {
      userId,
      email: "test@example.com",
      name: "Test User",
      createdAt: new Date(),
    };

    // mock repository가 myProfile을 호출하면 test 유저를 반환하도록 설정
    mockUsersRepository.getMyProfile.mockReturnValue(userData);

    // 서비스를 호출하고 test 유저 데이터를 반환하는지 확인
    const profile = await usersService.myProfile(userId);

    // 서비스가 myProfile을 호출했는지 확인
    expect(mockUsersRepository.getMyProfile).toHaveBeenCalledWith(userId);

    // 반환된 유저 데이터가 올바른지 확인
    expect(profile).toEqual(userData);

    expect(mockUsersRepository.getMyProfile).toHaveBeenCalledTimes(1);
  });
});
