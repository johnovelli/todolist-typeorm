import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todolist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  task!: string;

  @Column({ default: false })
  isHighPriority!: boolean;

  @Column({ default: false })
  isComplete!: boolean;

  @CreateDateColumn(
    { type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }
  )
  createdAt!: Date;

  @UpdateDateColumn(
    { type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }
  )
  updatedAt!: Date;

  constructor(task: string);
  constructor(task: string, isHighPriority: boolean);
  constructor(task: string, isHighPriority?: boolean) {
    this.task = task;
    this.isHighPriority = isHighPriority ?? false;
  }
}

