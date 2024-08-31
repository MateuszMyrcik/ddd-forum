import express from "express";
import { Errors } from "../constants";
import { PostModel } from "./Model";
import { prisma } from "../database";

export class PostController {
  private postModel: PostModel;

  constructor(postModel: PostModel) {
    this.postModel = postModel;
  }

  async getPosts(req: express.Request, res: express.Response) {
    try {
      const { sort } = req.query;

      if (sort !== "recent") {
        return res.status(400).json({
          error: Errors.ClientError,
          data: undefined,
          success: false,
        });
      }
      let postsWithVotes = await this.postModel.findAllPostsWithVotes();

      return res.json({
        error: undefined,
        data: { posts: postsWithVotes },
        success: true,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
    }
  }
}
