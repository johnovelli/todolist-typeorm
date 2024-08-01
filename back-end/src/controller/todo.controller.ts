import { Request, Response } from "express";
import { Todo } from "../entity/todo.entity";
import { GlobalExceptionHandler } from "../exception/global-exception.handler";
import { CreateTodoRequest } from "../interface/create-todo.interface";
import { TodoService } from "../service/todo.service";
import { TodoValidate } from "../validate/todo.validate";
import { TodoCreateDto } from "./dto/todo-create.dto";
import { TodoDto } from "./dto/todo.dto";

export class TodoController {
    private _todoService: TodoService
    constructor() {
        this._todoService = new TodoService();
    }

    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const todolist: Todo[] = await this._todoService.getAll();
            res.status(200).json(todolist.map((todo) => TodoDto.fromEntity(todo)));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res)
        }
    }

    async createTodo(req: Request, res: Response): Promise<void> {
        const { task, isHighPriority }: CreateTodoRequest = req.body;
        try {
            TodoValidate.validateCreateTodo(task, isHighPriority);
            const todo = TodoCreateDto.toEntity(
                new TodoCreateDto(task, isHighPriority)
            );
            const savedTodo = await this._todoService.createTodo(todo);
            res.status(201).json(TodoDto.fromEntity(savedTodo));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res)
        }
    }
}
