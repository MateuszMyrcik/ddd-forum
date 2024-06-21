import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Comment = {
  id: number;
  postId: number;
  text: string;
  memberId: number;
  parentCommentId: number | null;
};
export type Member = {
  id: number;
  userId: number;
};
export type Post = {
  id: number;
  memberId: number;
  postType: string;
  title: string;
  content: string;
  dateCreated: Generated<Timestamp>;
};
export type User = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};
export type Vote = {
  id: number;
  postId: number;
  memberId: number;
  voteType: string;
};
export type DB = {
  Comment: Comment;
  Member: Member;
  Post: Post;
  User: User;
  Vote: Vote;
};
