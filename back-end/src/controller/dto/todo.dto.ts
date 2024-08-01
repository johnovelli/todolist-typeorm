import { Todo } from "../../entity/todo.entity";

export class TodoDto {
    task: string;
    isHighPriority: boolean;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        task: string, isHighPriority: boolean, isComplete: boolean, createdAt: Date, updatedAt: Date
    ) {
        this.task = task;
        this.isHighPriority = isHighPriority;
        this.isComplete = isComplete;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromEntity(todolist: Todo): TodoDto {
        return new TodoDto (
            todolist.task,
            todolist.isHighPriority,
            todolist.isComplete,
            todolist.createdAt,
            todolist.updatedAt,
        );
    }
}