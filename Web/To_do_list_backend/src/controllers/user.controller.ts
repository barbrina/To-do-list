import argon2 from "argon2";
import { Request, Response } from "express";
import { z } from "zod";
import { Auth } from "../auth";
import { userCommand } from "../commands/user.command";
import { UserRepository } from "../repository/UserRepository";

class UserController {
  public async store(request: Request, response: Response) {
    try {
      const schema = z.object({
        name: z.string(),
        username: z.string(),
        password: z.string(),
        phone: z.string(),
        email: z.string(),
      });
      schema.parse({
        name: request.body.name,
        username: request.body.username,
        password: request.body.password,
        phone: request.body.phone,
        email: request.body.email,
      });
      const verifyUsername = await UserRepository.findByUsername(
        request.body.username
      );
      if (verifyUsername) {
        return response
          .status(409)
          .json({ message: "Já existe um usuário com este nome." });
      }
      const verifyEmail = await UserRepository.findByEmail(request.body.email);
      if (verifyEmail) {
        return response
          .status(409)
          .json({ message: "Já existe um usuário com este email." });
      }
      await userCommand.store({
        name: request.body.name,
        username: request.body.username,
        password: await argon2.hash(request.body.password),
        phone: request.body.phone,
        email: request.body.email,
      });
      return response.status(201).json({});
    } catch (e) {
      return response.status(422).json(e);
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const schema = z.object({
        username: z.string(),
        password: z.string(),
      });
      schema.parse({
        username: request.body.username,
        password: request.body.password,
      });
      const verify = await UserRepository.findByUsername(request.body.username);
      if (!verify) {
        return response
          .status(401)
          .json({ message: "Usuário ou senha inválidos." });
      }
      const validatePassword = await userCommand.index(
        verify,
        request.body.password
      );
      if (!validatePassword) {
        return response
          .status(401)
          .json({ message: "Usuário ou senha inválidos." });
      }
      const token = Auth.sign(verify);
      return response.status(200).json({ token });
    } catch (e) {
      return response.status(422).json(e);
    }
  }

  public async me(request: Request, response: Response) {
    const user = await UserRepository.findUser(response.locals.id);
    return response.status(200).json({ data: user });
  }
}

const userController = new UserController();

export { userController };
