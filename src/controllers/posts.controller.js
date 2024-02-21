import { PostsService } from "../services/posts.service.js";

export class PostsController {
  constructor(postsService) {
    this.postsService = postsService;
  }

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = await this.postsService.findPostById(postId);

      return res.status(200).json({ data: post });
    } catch (err) {
      next(err);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { title, content, status } = req.body;

      if (!title || !content) {
        throw new Error("InvalidParamsError");
      }

      const userId = res.locals.user.userId; // 인증된 사용자의 ID

      const createdPost = await this.postsService.createPost(
        userId,
        title,
        content,
        status
      );

      return res.status(201).json({ data: createdPost });
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

      const userId = res.locals.user.userId; // 인증된 사용자의 ID

      const updatedPost = await this.postsService.updatePost(
        userId,
        postId,
        title,
        content
      );

      return res.status(200).json({ data: updatedPost });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const userId = res.locals.user.userId; // 인증된 사용자의 ID

      const deletedPost = await this.postsService.deletePost(userId, postId);

      return res.status(200).json({ data: deletedPost });
    } catch (err) {
      next(err);
    }
  };
}
