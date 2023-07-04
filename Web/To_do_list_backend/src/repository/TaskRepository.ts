import { AppDataSource } from "../database/data-source";
import { Task } from "../database/entity/TaskEntity";
import { iList } from "../interfaces/iList";
import { iTask } from "../interfaces/iTask";

export class TaskRepository {
  public static async create(data: iTask, pai: iList) {
    const task = AppDataSource.getRepository(Task);
    return await task.save({
      descricao: data.description,
      deadline: data.deadline,
      conclusion: data.conclusion ? 1 : 0,
      taskLists: pai,
    });
  }
  public static async findTask(id: number) {
    const task = AppDataSource.getRepository(Task);
    return await task.findOneOrFail({ where: { id } });
  }

  public static async findAllTasks(id: string) {
    const task = AppDataSource.getRepository(Task);
    return await task.find({ where: { taskLists: { id } } });
  }

  public static async deleteTask(id: number) {
    const task = AppDataSource.getRepository(Task);
    await task.delete(id);
  }
}
