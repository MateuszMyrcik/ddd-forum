import { Post, User } from "../types";
import { faker } from "@faker-js/faker";

const mockUser: User = {
  username: faker.person.zodiacSign(),
  email: "Jan_Osinski@hotmail.com",
  firstName: "Shanna",
  lastName: "Emmerich",
};

const mockAuthor: User = {
  username: faker.person.zodiacSign(),
  email: "Marcelino.Stroman40@gmail.com",
  firstName: "Shanna",
  lastName: "Emmerich",
};

export const mockPosts: Post[] = [
  {
    id: faker.string.uuid(),
    comments: [],
    dateCreated: new Date("07-07-2020").toISOString(),
    memberPostedBy: mockUser,
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
        author: mockAuthor,
        dateCreate: new Date().toISOString(),
        text: "Nice first post",
      },
      {
        author: mockAuthor,
        dateCreate: new Date().toISOString(),
        text: "Nice first post",
      },
      {
        author: mockAuthor,
        dateCreate: new Date().toISOString(),
        text: "Nice first post",
      },
    ],
    dateCreated: new Date("07-07-2021").toISOString(),
    memberPostedBy: mockUser,
    title: "Second Post!",
    votes: [{ id: 3, postId: 2, voteType: "Upvote" }],
  },
  {
    id: faker.string.uuid(),
    comments: [],
    dateCreated: new Date("07-07-2022").toISOString(),
    memberPostedBy: mockUser,
    title: "Why DDD?",
    votes: [
      { id: 4, postId: 3, voteType: "Upvote" },
      { id: 5, postId: 3, voteType: "Upvote" },
      { id: 6, postId: 3, voteType: "Upvote" },
    ],
  },
];
