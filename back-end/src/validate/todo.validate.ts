import { CreateTodoNullException } from "../exception/create-todo-null.exception";
import { CreateTodoTypeException } from "../exception/create-todo-null.exception copy";


export class TodoValidate {

    static validateCreateTodo(task: string, isHighPriority: boolean) {
        if (!task || !isHighPriority) throw new CreateTodoNullException();
        if (typeof task !== 'string' || typeof isHighPriority !== 'boolean') throw new CreateTodoTypeException();
        if (!task.trim()) throw new CreateTodoNullException();
    }
}
