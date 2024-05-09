// https://kysely.dev/docs/getting-started
import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  users: UserTable;
}

export interface UserTable {
  id: Generated<number>;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
}
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
