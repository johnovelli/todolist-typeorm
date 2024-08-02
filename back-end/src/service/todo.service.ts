import { AppDataSource } from "../config/ormconfig";
import { TodoCreateDto } from "../controller/dto/todo-create.dto";
import { Todo } from "../entity/todo.entity";
import { GetAllFetchException } from "../exception/get-all-fetch.exception";
import { TodoNotFoundException } from "../exception/todo-not-found.exception";
import { TodoRepository } from "../repository/todo.repository";
import { TodoValidate } from "../validate/todo.validate";


export class TodoService {
    private _todoRepository: TodoRepository;
    constructor() {
        this._todoRepository =
            AppDataSource.getRepository(Todo) as TodoRepository;
    }
    
    async getAll(): Promise<Todo[]> {
        const todoList: Todo[] = await this._todoRepository.find();
        if (!todoList) throw new GetAllFetchException();
        return todoList;
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
        const todo: Todo | null = await this._todoRepository.findOne({ where: { id } });
        if (todo === null) throw new TodoNotFoundException();
        return todo;
    }
}

    
