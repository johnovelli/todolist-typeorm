import { AppDataSource } from "../config/ormconfig";
import { TodoCreateDto } from "../controller/dto/todo-create.dto";
import { Todo } from "../entity/todo.entity";
import { TodoNotFoundException } from "../exception/find/todo-not-found.exception";
import { TodoRepository } from "../repository/todo.repository";
import { TodoValidate } from "../validate/todo.service.validate";


export class TodoService {
    private _todoRepository: TodoRepository;
    constructor() {
        this._todoRepository =
            AppDataSource.getRepository(Todo) as TodoRepository;
    }
    
    async getAllTodos(): Promise<Todo[]> {
        const todolist: Todo[] = await this._todoRepository.find({
            order : {
                isHighPriority: 'DESC',
                updatedAt: 'DESC',
                createdAt: 'DESC',
            }
        });
        TodoValidate.validateGetAllTodos(todolist);
        return todolist;
    }

    async getAllFilteredTodos (filter: Partial<Todo>): Promise<Todo[]> {
        const filterParams = TodoValidate.validateGetFilteredTodos(filter);
        const filteredTodos: Todo[] = await this._todoRepository.find({
            where: {
                [filterParams.filterField]: filterParams.fieldValue,
            },
            order: {
                updatedAt: 'DESC',
                createdAt: 'DESC',
            }
        });
        return filteredTodos;
    }

    async createTodo(task: string, isHighPriority: boolean): Promise<Todo> {
        TodoValidate.validateCreateTodo(task, isHighPriority);
        const todo: Todo = TodoCreateDto.toEntity(
            new TodoCreateDto(task, isHighPriority)
        );
        return await this._todoRepository.save(todo);
    }

    async findTodoById(id: number): Promise<Todo> {
        TodoValidate.validadeFindTodoById(id);
        const todo: Todo | null = (
            await this._todoRepository.findOne({ where: { id } })
        );
        if (todo === null) throw new TodoNotFoundException();
        return todo;
    }

    async updateTodo(id: number, update: Partial<Todo>): Promise<Todo> {
        TodoValidate.validateUpdateTodo(update);
        const todoToUpdate = await this.findTodoById(id);
        Object.assign(todoToUpdate, update);
        return await this._todoRepository.save(todoToUpdate);
    }

    async deleteTodo(id: number): Promise<string> {
        const todoToDelete = await this.findTodoById(id);
        await this._todoRepository.delete(id);
        return `Task: ${todoToDelete.task} removed from db.`;
    }
}

    
