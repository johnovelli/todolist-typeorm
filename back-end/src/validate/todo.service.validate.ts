import { Todo } from "../entity/todo.entity";
import { CreateTodoNullException } from "../exception/create/create-todo-null.exception";
import { CreateTodoTypeException } from "../exception/create/create-todo-type.exception";
import { FilterTodoFieldException } from "../exception/filter/filter-todo-field.exception";
import { FindTodoTypeException } from "../exception/find/find-todo-type.exception";
import { GetAllFetchException } from "../exception/find/get-all-fetch.exception";
import { UpdateTodoFieldNameException } from "../exception/update/update-todo-field-name.exception";
import { UpdateTodoFieldTypeException } from "../exception/update/update-todo-field-type.exception";
import { UpdateTodoFieldException } from "../exception/update/update-todo-field.exception";

export class TodoValidate {
    
    static validateGetAllTodos(todolist: Todo[]): void {
        if (!todolist) throw new GetAllFetchException();
    }

    static validateCreateTodo(task: string, isHighPriority: boolean): void {
        if (!task || isHighPriority === null) throw new CreateTodoNullException();
        if (typeof task !== 'string' || typeof isHighPriority !== 'boolean') {
            throw new CreateTodoTypeException();
        }
    }

    static validadeFindTodoById(id: number): void {
        if(!id || typeof id !== 'number') throw new FindTodoTypeException();
    }

    static validadeUpdateTodo(update: Partial<Todo>): void {
        const updatesFields = ['task', 'isHighPriority', 'isComplete'];
        const updateFields = Object.keys(update);
        if (updateFields.length !== 1) throw new UpdateTodoFieldException();

        const updateField = updateFields[0];
        if (!updatesFields.includes(updateField)) throw new UpdateTodoFieldNameException();
        if (updateField === 'task' && typeof update[updateField] !== 'string') {
            throw new UpdateTodoFieldTypeException();
        }
        if ((
            updateField === 'isHighPriority' || updateField === 'isComplete'
        ) && typeof update[updateField] !== 'boolean'){
            throw new UpdateTodoFieldTypeException(); 
        }
    }

    static validateGetFilteredTodos(filter: Partial<Todo>): 
    { filterField: string, fieldValue: boolean }{
        const filterFields = Object.keys(filter) as (keyof Todo)[];
        if (filterFields.length !== 1) throw new FilterTodoFieldException();

        const filterField: string = filterFields[0];
        if (filterField === 'isHighPriority' || filterField === 'isComplete') {
            const fieldValue = filter[filterField];
            if (typeof fieldValue !== 'boolean') throw new FilterTodoFieldException();
            return { filterField, fieldValue };
        } else {
            throw new FilterTodoFieldException();
        }
    }
}
