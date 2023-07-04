import { DataSource } from "typeorm";
import { Share } from "./entity/ShareEntity";
import { Task } from "./entity/TaskEntity";
import { TaskList } from "./entity/TaskListEntity";
import { User } from "./entity/UserEntity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "pass",
  database: "todolist",
  logging: true,
  entities: [User, TaskList, Task, Share],
  subscribers: [],
  migrations: [`${__dirname}/migrations/**/*.{ts,js}`],
  migrationsRun: true,
});
