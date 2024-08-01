import { CreateTodoNullException } from "../exception/create-todo-null.exception";
import { CreateTodoTypeException } from "../exception/create-todo-null.exception copy";


export class TodolistValidate {

    static validateCreateTodo(task: string, isHighPriority: boolean) {
        if (typeof task !== 'string' || typeof isHighPriority !== 'boolean') throw new CreateTodoTypeException();
        if (!task || !isHighPriority || !task.trim()) throw new CreateTodoNullException();
    }
}
