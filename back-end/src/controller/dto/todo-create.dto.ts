import { Todolist } from "../../entity/todolist.entity";

export class TodoCreateDto {
    task: string;
    isHighPriority: boolean;

    constructor(task: string, isHighPriority: boolean) {
        this.task = task;
        this.isHighPriority = isHighPriority;
    }

    static toEntity(todoCreateDto: TodoCreateDto): Todolist {
        const {task, isHighPriority} = todoCreateDto;
        const todo = new Todolist(task, isHighPriority)
        return todo;
    }
}