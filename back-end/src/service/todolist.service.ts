import { AppDataSource } from "../config/ormconfig";
import { Todolist } from "../entity/todolist.entity";
import { TodolistRepository } from "../repository/todolist.repository";


export class TodolistService {
    private _todolistRepository: TodolistRepository;
    constructor() {
        this._todolistRepository =
            AppDataSource.getRepository(Todolist) as TodolistRepository;
    }
    
    async getAll(): Promise<Todolist[]> {
        return await this._todolistRepository.find();
    }

    async createTodo(todo: Todolist): Promise<Todolist> {
        return await this._todolistRepository.save(todo);
    }
}
