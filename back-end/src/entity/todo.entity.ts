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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt!: Date;

  constructor(task: string, isHighPriority: boolean = false) {
    this.task! = task;
    this.isHighPriority! = isHighPriority;
  }
}

