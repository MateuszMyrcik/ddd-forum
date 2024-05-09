import { Kysely, UpdateKeys } from "kysely";
import { Database, NewUser, UserUpdate, User } from "../types/db";

export class UserModel {
  private db: Kysely<Database>;

  constructor(db: Kysely<Database>) {
    this.db = db;
  }

  async findByEmail(email: string) {
    return this.db
      .selectFrom("users")
      .selectAll("users")
      .where("email", "=", email)
      .executeTakeFirst();
  }

  async findByUsername(username: string) {
    return this.db
      .selectFrom("users")
      .selectAll("users")
      .where("username", "=", username)
      .executeTakeFirst();
  }

  async findByUserId(userId: number) {
    return this.db
      .selectFrom("users")
      .selectAll("users")
      .where("id", "=", userId)
      .executeTakeFirst();
  }

  async insertUser(user: NewUser) {
    return this.db
      .insertInto("users")
      .values(user)
      .returningAll()
      .executeTakeFirst();
  }

  async editUser(user: UserUpdate & { id: number }) {
    return this.db
      .updateTable("users")
      .set({
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
      })
      .where("id", "=", user.id)
      .executeTakeFirst();
  }
}
