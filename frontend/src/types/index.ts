export type Vote = {
  id: number;
  postId: number;
  voteType: "Upvote" | "Downvote";
};
export type Comment = {
  text: string;
  author: User;
  dateCreate: string;
};

export type User = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

export type Post = {
  id: string;
  title: string;
  dateCreated: string;
  memberPostedBy: User;
  comments: Comment[];
  votes: Vote[];
};

export type SortPostsBy = "POPULAR" | "NEW";
