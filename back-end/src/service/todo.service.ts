import { AppDataSource } from "../config/ormconfig";
import { Todo } from "../entity/todo.entity";
import { TodoRepository } from "../repository/todo.repository";


export class TodoService {
    private _todoRepository: TodoRepository;
    constructor() {
        this._todoRepository =
            AppDataSource.getRepository(Todo) as TodoRepository;
    }
    
    async getAll(): Promise<Todo[]> {
        return await this._todoRepository.find();
    }

    async createTodo(todo: Todo): Promise<Todo> {
        return await this._todoRepository.save(todo);
    }
}
