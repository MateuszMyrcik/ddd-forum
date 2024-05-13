import { PrismaClient } from "@prisma/client";
import { User } from "../types/db/types";

export class UserModel {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async findByEmail(email: string) {
    return this.db.user.findFirst({ where: { email: { equals: email } } });
  }

  async findByUsername(username: string) {
    return this.db.user.findFirst({ where: { username } });
  }

  async findByUserId(userId: number) {
    return this.db.user.findFirst({ where: { id: userId } });
  }

  async insertUser(user: Omit<User, "id">) {
    const { first_name, email, password, last_name, username } = user;
    return this.db.user.create({
      data: { email, first_name, last_name, password, username },
    });
  }

  async editUser(user: Omit<User, "password" | "id"> & { id: number }) {
    const { email, first_name, last_name, username } = user;
    return this.db.user.update({
      where: { id: user.id },
      data: { email, first_name, last_name, username },
    });
  }
}
