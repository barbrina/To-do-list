import { iTask } from "../interfaces/iTask";
import { ListRepository } from "../repository/ListRepository";
import { TaskRepository } from "../repository/TaskRepository";

class TaskCommand {
  public async store(data: iTask) {
    const pai = await ListRepository.findList(data.pai);
    return await TaskRepository.create(data, pai);
  }

  public async getAllLists(id: string) {
    return await TaskRepository.findAllTasks(id);
  }

  public async deleteTask(id: number) {
    return await TaskRepository.deleteTask(id);
  }
}

const taskCommand = new TaskCommand();

export { taskCommand };
