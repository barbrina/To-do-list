import { AppDataSource } from "../database/data-source";
import { User } from "../database/entity/UserEntity";
import { iUser } from "../interfaces/iUser";

export class UserRepository {
  public static async create(data: iUser) {
    const user = AppDataSource.getRepository(User);
    return await user.save(data);
  }
  public static async findByUsername(username: string) {
    const user = AppDataSource.getRepository(User);
    return await user.findOne({ where: { username } });
  }
  public static async findByEmail(email: string) {
    const user = AppDataSource.getRepository(User);
    return await user.findOne({ where: { email } });
  }
  public static async findUser(id: number) {
    const task = AppDataSource.getRepository(User);
    return await task.findOneOrFail({ where: { id } });
  }
}
