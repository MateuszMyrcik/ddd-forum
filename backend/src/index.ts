import { UserController } from "./user/Controller";
import express from "express";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types/db";
import { UserModel } from "./user/Model";
import "dotenv/config";

const app = express();
const port = 3000;
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const bootstrap = async () => {
  const dialect = new PostgresDialect({
    pool: new Pool({
      user: DB_USER,
      host: DB_HOST,
      database: DB_DATABASE,
      password: DB_PASSWORD,
      port: Number(DB_PORT),
    }),
  });
  const db = new Kysely<Database>({
    dialect,
  });
  const userModel = new UserModel(db);
  const userController = new UserController(userModel);

  app.use(express.json());

  app.get("/", async (_, res) => {
    res.send("DDD Forum api is alive!");
  });

  app.post("/users/new", async (req, res) => {
    userController.createUser(req, res);
  });

  app.post("/users/edit/:userId", async (req, res) => {
    userController.editUser(req, res);
  });

  app.get("/users", async (req, res) => {
    userController.getByUserEmail(req, res);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

bootstrap();
