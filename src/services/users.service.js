export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  createUser = async (email, password, name, grade) => {
    const createdUser = await this.usersRepository.createUser(
      email,
      password,
      name,
      grade
    );

    return {
      userId: createdUser.userId,
      email: createdUser.email,
      name: createdUser.name,
      grade: createdUser.grade,
      createdAt: createdUser.createdAt,
    };
  };

  signUser = async (email, password) => {
    const user = await this.usersRepository.signInByEmailPassword(
      email,
      password
    );

    if (!user) {
      throw new Error("UserNotFound");
    }

    return {
      userId: user.userId,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  };

  myProfile = async (userId) => {
    const user = await this.usersRepository.getMyProfile(userId);
    return user;
  };
}
