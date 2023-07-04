import argon2 from "argon2";
import { iUser } from "../interfaces/iUser";
import { UserRepository } from "../repository/UserRepository";

class UserCommand {
  public async store(data: iUser) {
    return await UserRepository.create(data);
  }
  public async index(data: iUser, password: string) {
    return await argon2.verify(data.password, password);
  }
}

const userCommand = new UserCommand();

export { userCommand };
