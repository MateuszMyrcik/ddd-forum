import express from "express";
import { UserModel } from "./Model";
import { generate } from "generate-password";
import { User } from "../types/db/types";

const Errors = {
  UsernameAlreadyTaken: "UserNameAlreadyTaken",
  EmailAlreadyInUse: "EmailAlreadyInUse",
  ValidationError: "ValidationError",
  ServerError: "ServerError",
  ClientError: "ClientError",
  UserNotFound: "UserNotFound",
};

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
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
        return;
      }

      const existingUsername = await this.userModel.findByUsername(username);
      if (existingUsername) {
        res.status(409).json({
          error: Errors.UsernameAlreadyTaken,
          data: undefined,
          success: false,
        });
        return;
      }

      const existingEmail = await this.userModel.findByEmail(email);
      if (existingEmail) {
        res.status(409).json({
          error: Errors.EmailAlreadyInUse,
          data: undefined,
          success: false,
        });
        return;
      }

      const user = await this.userModel.insertUser({
        ...req.body,
        password: generate({
          length: 10,
        }),
      });

      res.status(201).json({
        error: undefined,
        data: this.parseUserForResponse(user),
        success: true,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
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

      if (![username, email, firstName, lastName].filter(Boolean).length) {
        res.status(400).json({
          error: Errors.ValidationError,
          data: undefined,
          success: false,
        });
        return;
      }

      const existingUser = await this.userModel.findByUserId(numericUserId);

      if (!existingUser) {
        res.status(404).json({
          error: Errors.UserNotFound,
          data: undefined,
          success: false,
        });
        return;
      }

      if (username) {
        const existingUsername = await this.userModel.findByUsername(username);

        if (existingUsername) {
          res.status(409).json({
            error: Errors.UsernameAlreadyTaken,
            data: undefined,
            success: false,
          });
          return;
        }
      }

      if (email) {
        const existingEmail = await this.userModel.findByEmail(email);

        if (existingEmail) {
          res.status(409).json({
            error: Errors.EmailAlreadyInUse,
            data: undefined,
            success: false,
          });
          return;
        }
      }

      const user = await this.userModel.editUser({
        ...req.body,
        id: numericUserId,
      });

      res.status(200).json({
        error: undefined,
        data: this.parseUserForResponse(user),
        success: true,
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: Errors.ServerError, data: undefined, success: false });
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
          error: Errors.UserNotFound,
          data: undefined,
          success: false,
        });
        return;
      }

      res.status(200).json({
        error: undefined,
        data: this.parseUserForResponse(foundUser),
        success: true,
      });
    } catch (err) {
      res
        .status(500)
        .json({ error: "ServerError", data: undefined, success: false });
    }
  }

  private parseUserForResponse(user: User) {
    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;
    return returnData;
  }
}
