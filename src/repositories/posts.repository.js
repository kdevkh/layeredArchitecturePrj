export class PostsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllPosts = async () => {
    const posts = await this.prisma.posts.findMany();
    return posts;
  };

  findPostById = async (postId) => {
    const post = await this.prisma.posts.findUnique({
      where: { postId: +postId },
    });
    return post;
  };

  createPost = async (userId, title, content, status) => {
    const createdPost = await this.prisma.posts.create({
      data: {
        title,
        content,
        status,
        user: { connect: { userId } },
      },
    });
    return createdPost;
  };

  updatePost = async (postId, data) => {
    const updatedPost = await this.prisma.posts.update({
      where: {
        postId: +postId,
      },
      data: data,
    });

    return updatedPost;
  };

  deletePost = async (postId) => {
    const deletedPost = await this.prisma.posts.delete({
      where: {
        postId: +postId,
      },
    });

    return deletedPost;
  };
}
