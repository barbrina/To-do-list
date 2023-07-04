import { iList } from "../interfaces/iList";
import { ListRepository } from "../repository/ListRepository";

class ListCommand {
  public async store(data: iList) {
    return await ListRepository.create(data);
  }

  public async getAllLists(id: number) {
    return await ListRepository.findAllLists(id);
  }

  public async findList(id: string) {
    return await ListRepository.findList(id);
  }

  public async delete(id: number) {
    return await ListRepository.deleteTaskList(id);
  }
}

const listCommand = new ListCommand();

export { listCommand };
