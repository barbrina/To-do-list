import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TaskList } from "./TaskListEntity";
import { User } from "./UserEntity";

@Entity({ name: "share" })
export class Share {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  accepted: boolean;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public invite_at: Date;

  @ManyToOne(() => TaskList, (taskList) => taskList.share)
  taskLists: TaskList;

  @ManyToOne(() => User, (user) => user.shares)
  user: User;
}
