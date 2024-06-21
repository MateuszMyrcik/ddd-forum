import { PostController } from "./post/Controller";
import { UserController } from "./user/Controller";
import express from "express";
import { UserModel } from "./user/Model";
import "dotenv/config";
import { prisma } from "./database";
import { PostModel } from "./post/Model";
import cors from "cors";

const app = express();
const port = 3000;

const main = async () => {
  const userModel = new UserModel(prisma);
  const postModel = new PostModel(prisma);

  const userController = new UserController(userModel);
  const postController = new PostController(postModel);

  app.use(cors());
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  app.use(express.json());

  app.post("/users/new", async (req, res) => {
    userController.createUser(req, res);
  });

  app.post("/users/edit/:userId", async (req, res) => {
    userController.editUser(req, res);
  });

  app.get("/users", async (req, res) => {
    userController.getByUserEmail(req, res);
  });

  // Get posts "/posts?sort=recent"
  app.get("/posts", async (req, res) => {
    postController.getPosts(req, res);
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
