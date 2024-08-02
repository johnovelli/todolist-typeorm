import { Todo } from "../entity/todo.entity";
import { CreateTodoNullException } from "../exception/create-todo-null.exception";
import { CreateTodoTypeException } from "../exception/create-todo-type.exception";
import { FindTodoTypeException } from "../exception/find-todo-type.exception";
import { GetAllFetchException } from "../exception/get-all-fetch.exception";
import { UpdateTodoFieldNameException } from "../exception/update-todo-field-name.exception";
import { UpdateTodoFieldTypeException } from "../exception/update-todo-field-type.exception";
import { UpdateTodoFieldException } from "../exception/update-todo-field.exception";

export class TodoValidate {
    static validateGetAllTodos(todolist: Todo[]): void {
        if (!todolist) throw new GetAllFetchException();
    }

    static validateCreateTodo(task: string, isHighPriority: boolean): void {
        if (!task || !isHighPriority) throw new CreateTodoNullException();
        if (typeof task !== 'string' || typeof isHighPriority !== 'boolean') {
            throw new CreateTodoTypeException();
        }
        if (!task.trim()) throw new CreateTodoNullException();
    }

    static validadeFindTodoById(id: number): void {
        if(!id || typeof id !== 'number') throw new FindTodoTypeException();
    }

    static validadeUpdateTodo(update: Partial<Todo>): void {
        const fields = ['task', 'isHighPriority', 'isComplete'];
        const updateField = Object.keys(update);
        const field = updateField[0];
        if (updateField.length !== 1) throw new UpdateTodoFieldException();
        if (!fields.includes(field)) throw new UpdateTodoFieldNameException();
        if (field === 'task' && typeof update[field] !== 'string') {
            throw new UpdateTodoFieldTypeException();
        }
        if ((field === 'isHighPriority' || field === 'isComplete') && typeof update[field] !== 'boolean') {
            throw new UpdateTodoFieldTypeException();
        }
    }
}
