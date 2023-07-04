import { AppDataSource } from "../database/data-source";
import { TaskList } from "../database/entity/TaskListEntity";
import { iList } from "../interfaces/iList";

export class ListRepository {
  public static async create(data: iList) {
    const list = AppDataSource.getRepository(TaskList);
    return await list.save(data);
  }
  public static async findList(id: string) {
    const list = AppDataSource.getRepository(TaskList);
    return await list.findOneOrFail({ where: { id } });
  }

  public static async findAllLists(id: number) {
    const list = AppDataSource.getRepository(TaskList);
    return await list.find({ where: { user: { id } } });
  }

  public static async findByTaskList(id_list: string) {
    const list = AppDataSource.getRepository(TaskList);
    return await list.findOne({ where: { id: id_list } });
  }

  public static async deleteTaskList(id_list: number) {
    const list = AppDataSource.getRepository(TaskList);
    return await list.delete(id_list);
  }

  public static async findInvites(id: number) {
    const list = AppDataSource.getRepository(TaskList);
    return await list.find({ where: { user: { id } } });
  }
}
