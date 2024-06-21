import { PrismaClient } from "@prisma/client";

export class PostModel {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async findAllPostsWithVotes() {
    return await this.db.post.findMany({
      include: {
        votes: true, // Include associated votes for each post
        memberPostedBy: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
      orderBy: {
        dateCreated: "desc", // Sorts by dateCreated in descending order
      },
    });
  }
}
