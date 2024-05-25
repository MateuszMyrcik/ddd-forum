import { Post } from "../types";
import { faker } from "@faker-js/faker";

export const mockPosts: Post[] = [
  {
    id: faker.string.uuid(),
    comments: [],
    dateCreated: new Date("07-07-2020").toISOString(),
    memberPostedBy: { username: "username" },
    title: "First Post",
    votes: [
      { id: 1, postId: 1, voteType: "Upvote" },
      { id: 2, postId: 1, voteType: "Upvote" },
    ],
  },
  {
    id: faker.string.uuid(),
    comments: [
      {
        author: {
          username: "Comentator 1",
        },
        dateCreate: new Date().toISOString(),
        text: "Nice first post",
      },
      {
        author: {
          username: "Comentator 1",
        },
        dateCreate: new Date().toISOString(),
        text: "Nice first post",
      },
      {
        author: {
          username: "Comentator 1",
        },
        dateCreate: new Date().toISOString(),
        text: "Nice first post",
      },
    ],
    dateCreated: new Date("07-07-2021").toISOString(),
    memberPostedBy: { username: "username" },
    title: "Second Post!",
    votes: [{ id: 3, postId: 2, voteType: "Upvote" }],
  },
  {
    id: faker.string.uuid(),
    comments: [],
    dateCreated: new Date("07-07-2022").toISOString(),
    memberPostedBy: { username: "username" },
    title: "Why DDD?",
    votes: [
      { id: 4, postId: 3, voteType: "Upvote" },
      { id: 5, postId: 3, voteType: "Upvote" },
      { id: 6, postId: 3, voteType: "Upvote" },
    ],
  },
];
