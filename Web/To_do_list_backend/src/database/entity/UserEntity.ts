import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Share } from "./ShareEntity";
import { TaskList } from "./TaskListEntity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column()
  name: string;
  @Column({ length: 56 })
  username: string;
  @Column()
  password: string;
  @Column()
  phone: string;
  @Column()
  email: string;

  @OneToMany(() => TaskList, (taskList) => taskList.user)
  taskLists: TaskList[];

  @OneToMany(() => Share, (share) => share.user)
  shares: Share[];
}
