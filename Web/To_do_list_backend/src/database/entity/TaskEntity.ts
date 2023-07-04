import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskList } from "./TaskListEntity";

@Entity({ name: "task" })
export class Task {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  descricao: string;
  @Column()
  conclusion: number;
  @Column()
  deadline: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @ManyToOne(() => TaskList, (taskList) => taskList.task)
  taskLists: TaskList;
}
