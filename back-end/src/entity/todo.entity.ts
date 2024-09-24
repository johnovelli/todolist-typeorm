import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  task!: string;

  @Column({ default: false })
  isHighPriority!: boolean;

  @Column({ default: false })
  isComplete!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  constructor(task: string, isHighPriority: boolean) {
    this.task = task;
    this.isHighPriority = isHighPriority;
    this.isComplete = false;
  }
}