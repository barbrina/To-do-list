import { Request, Response } from "express";
import { z } from "zod";
import { AppDataSource } from "../database/data-source";
import { Share } from "../database/entity/ShareEntity";
import { ListRepository } from "../repository/ListRepository";
import { ShareRepository } from "../repository/ShareRepository";
import { UserRepository } from "../repository/UserRepository";

class ShareController {
  public async index(request: Request, response: Response) {
    try {
      const invites = await ShareRepository.findInvites(response.locals.id);
      return response.status(200).json(invites);
    } catch (e) {
      return response.status(422).json(e);
    }
  }

  public async store(request: Request, response: Response) {
    try {
      const schema = z.object({
        invited_username: z.string(),
        id_list: z.string(),
      });
      schema.parse({
        invited_username: request.body.invited_username,
        id_list: request.body.id_list,
      });
      const verifyUsername = await UserRepository.findByUsername(
        request.body.invited_username
      );
      if (!verifyUsername) {
        return response
          .status(404)
          .json({ message: "Este usuário não existe." });
      }
      const verifyList = await ListRepository.findByTaskList(
        request.body.id_list
      );
      if (!verifyList) {
        return response.status(404).json({ message: "Esta lista não existe." });
      }
      const share = await ShareRepository.create(
        verifyUsername.id,
        verifyList.id
      );
      return response.status(201).json({ data: share });
    } catch (e) {
      return response.status(422).json(e);
    }
  }
  public async delete(request: Request, response: Response) {
    try {
      const schema = z.object({
        id_share: z.number(),
      });
      schema.parse({
        id_share: request.body.id_share,
      });
      await ShareRepository.delete(request.body.id_share);
      return response.status(204).send();
    } catch (e) {
      return response.status(422).json(e);
    }
  }

  public async invites(request: Request, response: Response) {
    const invites = AppDataSource.createQueryBuilder(Share, "s")
      .innerJoinAndSelect("s.user", "user")
      .innerJoinAndSelect("s.taskLists", "taskList")
      .where("s.user = :id", { id: response.locals.id })
      .andWhere("s.accepted = :false", { false: false });

    return response.status(200).json(await invites.getMany());
  }

  public async accepted(request: Request, response: Response) {
    console.log(request.body.id);
    const share = await AppDataSource.getRepository(Share).findOneOrFail({
      where: {
        id: request.body.id,
      },
    });
    share.accepted = true;
    await AppDataSource.getRepository(Share).save(share);

    return response.status(200).send("");
  }

  public async deleted(request: Request, response: Response) {
    await AppDataSource.getRepository(Share).delete(request.params.id);

    return response.status(200).send("");
  }
}

const shareController = new ShareController();

export { shareController };
