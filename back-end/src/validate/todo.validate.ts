import { CreateTodoNullException } from "../exception/create-todo-null.exception";
import { CreateTodoTypeException } from "../exception/create-todo-type.exception";
import { FindTodoTypeException } from "../exception/find-todo-type.exception";

export class TodoValidate {

    static validateCreateTodo(task: string, isHighPriority: boolean) {
        if (!task || !isHighPriority) throw new CreateTodoNullException();
        if (typeof task !== 'string' || typeof isHighPriority !== 'boolean') throw new CreateTodoTypeException();
        if (!task.trim()) throw new CreateTodoNullException();
    }

    static validadeFindTodoById(id: number) {
        if(!id || typeof id !== 'number') throw new FindTodoTypeException();
    }
}
