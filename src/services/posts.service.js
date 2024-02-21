export class PostsService {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }

  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();
    // 여기에 orderKey orderValue 설정 가능할 듯?
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return posts.map((post) => {
      return {
        postId: post.postId,
        userId: post.userId,
        title: post.title,
        status: post.status,
        createdAt: post.createdAt,
      };
    });
  };

  findPostById = async (postId) => {
    const post = await this.postsRepository.findPostById(postId);

    return {
      postId: post.postId,
      userId: post.userId,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    };
  };

  createPost = async (userId, title, content, status) => {
    const createdPost = await this.postsRepository.createPost({
      userId: userId,
      title: title,
      content: content,
      status: status,
    });
    return createdPost;
  };

  updatePost = async (userId, postId, title, content) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error("존재하지 않는 게시글입니다.");

    if (post.userId !== userId) {
      throw new Error("게시물을 수정할 권한이 없습니다.");
    }

    await this.postsRepository.updatePost(postId, title, content);

    const updatedPost = await this.postsRepository.findPostById(postId);

    return {
      postId: updatedPost.postId,
      userId: updatedPost.userId,
      title: updatedPost.title,
      content: updatedPost.content,
      status: updatedPost.status,
      createdAt: updatedPost.createdAt,
    };
  };

  deletePost = async (userId, postId) => {
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error("존재하지 않는 게시글입니다.");

    if (post.userId !== userId) {
      throw new Error("게시물을 삭제할 권한이 없습니다.");
    }

    await this.postsRepository.deletePost(postId);

    return { message: "삭제 성공" };
  };
}
