import { AppDataSource } from "../database/data-source";
import { Share } from "../database/entity/ShareEntity";
import { iUser } from "../interfaces/iUser";
import { ListRepository } from "./ListRepository";
import { UserRepository } from "./UserRepository";

export class ShareRepository {
  public static async create(userId: number, listId: string) {
    const list = await ListRepository.findList(listId);
    const user = await UserRepository.findUser(userId);
    return await AppDataSource.getRepository(Share).save({
      user: user,
      taskLists: list,
      accepted: false,
    });
  }
  public static async delete(shareId: number) {
    const share = await AppDataSource.getRepository(Share).delete(shareId);
  }

  public static async deleteColab(data: iUser) {
    const share = AppDataSource.getRepository(Share);
    const userS = await share.findOneOrFail({
      where: { user: { id: data.id } },
    });
    await share.delete(userS.id);
  }

  public static async findInvites(id: number) {
    const list = AppDataSource.getRepository(Share);
    return await list.find({ where: { user: { id } } });
  }
}
