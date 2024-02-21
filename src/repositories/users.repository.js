export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createUser = async (email, password, name, grade) => {
    const createdUser = await this.prisma.users.create({
      data: {
        email,
        password,
        name,
        grade,
      },
    });

    return createdUser;
  };

  signInByEmailPassword = async (email, password) => {
    const user = await this.prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (!user || user.password !== password) {
      return null;
    }

    return user;
  };

  getMyProfile = async (userId) => {
    const user = await this.prisma.users.findFirst({
      where: {
        userId: userId,
      },
      select: {
        userId: true,
        email: true,
        name: true,
        grade: true,
        createdAt: true,
      },
    });

    return user;
  };
}
