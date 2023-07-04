import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Share } from "./ShareEntity";
import { Task } from "./TaskEntity";
import { User } from "./UserEntity";

@Entity({ name: "taskList" })
export class TaskList {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column()
  name: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;

  @ManyToOne(() => User, (user) => user.taskLists)
  user: User;

  @OneToMany(() => Share, (share) => share.taskLists)
  share: Share[];

  @OneToMany(() => Task, (task) => task.taskLists)
  task: Task[];
}
