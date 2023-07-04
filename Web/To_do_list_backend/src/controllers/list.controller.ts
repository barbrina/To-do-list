import { Request, Response } from "express";
import { z } from "zod";
import { listCommand } from "../commands/list.command";
import { AppDataSource } from "../database/data-source";
import { Share } from "../database/entity/ShareEntity";
import { UserRepository } from "../repository/UserRepository";

class ListController {
  public async store(request: Request, response: Response) {
    try {
      const schema = z.object({
        name: z.string(),
      });
      schema.parse({
        name: request.body.name,
      });
      const user = await UserRepository.findUser(response.locals.id);
      const list = await listCommand.store({
        name: request.body.name,
        user,
      });
      return response.status(201).json(list);
    } catch (e) {
      return response.status(422).json(e);
    }
  }

  public async index(request: Request, response: Response) {
    const list = await listCommand.getAllLists(response.locals.id);
    return response.status(200).json(list);
  }

  public async delete(request: Request, response: Response) {
    await listCommand.delete(request.body.id);
    return response.status(204).send("");
  }

  public async name(request: Request, response: Response) {
    const list = await listCommand.findList(request.params.id);
    return response.status(200).json({ data: list });
  }

  public async searchColaborators(request: Request, response: Response) {
    const colaborators = AppDataSource.createQueryBuilder(Share, "s")
      .innerJoinAndSelect("s.user", "user")
      .where("s.taskLists = :id", { id: request.params.id });

    return response
      .status(200)
      .json((await colaborators.getMany()).map((item) => item.user.username));
  }
}

const listController = new ListController();

export { listController };
