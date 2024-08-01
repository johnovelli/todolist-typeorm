import { Todo } from "../../entity/todo.entity";

export class TodoCreateDto {
    task: string;
    isHighPriority: boolean;

    constructor(task: string, isHighPriority: boolean) {
        this.task = task;
        this.isHighPriority = isHighPriority;
    }

    static toEntity(todoCreateDto: TodoCreateDto): Todo {
        const {task, isHighPriority} = todoCreateDto;
        const todo = new Todo(task, isHighPriority)
        return todo;
    }
}