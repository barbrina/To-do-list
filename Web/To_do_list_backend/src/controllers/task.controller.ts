import { Request, Response } from "express";
import { z } from "zod";
import { taskCommand } from "../commands/task.command";
import { AppDataSource } from "../database/data-source";
import { Task } from "../database/entity/TaskEntity";
import { TaskRepository } from "../repository/TaskRepository";

class TaskController {
  public async store(request: Request, response: Response) {
    try {
      const schema = z.object({
        description: z.string(),
        deadline: z.date(),
        conclusion: z.boolean(),
        pai: z.string(),
      });
      schema.parse({
        description: request.body.description,
        deadline: new Date(request.body.deadline),
        conclusion: request.body.conclusion,
        pai: request.body.pai,
      });
      const task = await taskCommand.store({
        description: request.body.description,
        deadline: new Date(request.body.deadline),
        conclusion: request.body.conclusion,
        pai: request.body.pai,
      });
      return response.status(201).json(task);
    } catch (e) {
      return response.status(201).json(e);
    }
  }

  public async delete(request: Request, response: Response) {
    await taskCommand.deleteTask(request.body.id);
    return response.status(204).send("");
  }

  public async update(request: Request, response: Response) {
    console.log(request.body.id);
    const task = await AppDataSource.getRepository(Task).findOneOrFail({
      where: { id: request.body.id },
    });
    task.conclusion = 1;
    await AppDataSource.getRepository(Task).save(task);

    return response.status(204).send("");
  }

  public async edit(request: Request, response: Response) {
    const task = await AppDataSource.getRepository(Task).findOneOrFail({
      where: { id: request.body.id },
    });
    task.descricao = request.body.name;

    await AppDataSource.getRepository(Task).save(task);
    return response.status(200).send("");
  }

  public async getAllTasks(request: Request, response: Response) {
    const tasks = await TaskRepository.findAllTasks(request.params.id);
    return response.status(200).json(tasks);
  }
}

const taskController = new TaskController();

export { taskController };
