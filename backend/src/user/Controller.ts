import express from "express";
import { UserModel } from "./Model";
import { generate } from "generate-password";

export class UserController {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async createUser(req: express.Request, res: express.Response) {
    const { username, email, firstName, lastName } = req.body;

    try {
      if (!username || !email || !firstName || !lastName) {
        res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
        return;
      }

      const isExistingEmail = Boolean(await this.userModel.findByEmail(email));
      const isExistingUsername = Boolean(
        await this.userModel.findByUsername(username)
      );

      if (isExistingUsername) {
        res.status(409).json({
          error: "UsernameAlreadyTaken",
          data: undefined,
          success: false,
        });
        return;
      }

      if (isExistingEmail) {
        res.status(409).json({
          error: "EmailAlreadyInUse",
          data: undefined,
          success: false,
        });
        return;
      }

      const result = await this.userModel.insertUser({
        email,
        username,
        password: generate({
          length: 10,
        }),
        last_name: lastName,
        first_name: firstName,
      });

      res.status(201).json({
        error: undefined,
        data: { id: result?.id, email, username, firstName, lastName },
        success: true,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  async editUser(req: express.Request, res: express.Response) {
    const { email, username, firstName, lastName } = req.body;
    const { userId } = req.params;
    const numericUserId = Number(userId);

    try {
      if (isNaN(numericUserId)) {
        throw Error("Not numeric userId");
      }

      if (!username || !email || !firstName || !lastName) {
        res.status(400).json({
          error: "ValidationError",
          data: undefined,
          success: false,
        });
        return;
      }

      const foundUser = await this.userModel.findByUserId(numericUserId);

      if (!foundUser) {
        res.status(404).json({
          error: "UserNotFound",
          data: undefined,
          success: false,
        });
        return;
      }

      const isExistingEmail = Boolean(await this.userModel.findByEmail(email));
      const isExistingUsername = Boolean(
        await this.userModel.findByUsername(username)
      );

      if (isExistingUsername) {
        res.status(409).json({
          error: "UsernameAlreadyTaken",
          data: undefined,
          success: false,
        });
        return;
      }

      if (isExistingEmail) {
        res.status(409).json({
          error: "EmailAlreadyInUse",
          data: undefined,
          success: false,
        });
        return;
      }

      await this.userModel.editUser({
        id: numericUserId,
        email,
        username,
        last_name: lastName,
        first_name: firstName,
      });

      res.status(200).json({
        error: undefined,
        data: { id: numericUserId, email, username, firstName, lastName },
        success: true,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
      return;
    }
  }

  async getByUserEmail(req: express.Request, res: express.Response) {
    try {
      if (!req.query.email || typeof req.query.email !== "string") {
        throw Error("Wrong or missing email query");
      }

      const foundUser = await this.userModel.findByEmail(req.query.email);

      if (!foundUser) {
        res.status(404).json({
          error: "UserNotFound",
          data: undefined,
          success: false,
        });
        return;
      }

      res.status(200).json({
        error: undefined,
        data: {
          id: foundUser.id,
          email: foundUser.email,
          firstName: foundUser.first_name,
          lastName: foundUser.last_name,
        },
        success: true,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }
}
