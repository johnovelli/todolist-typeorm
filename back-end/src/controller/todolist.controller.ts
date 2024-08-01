import { Request, Response } from "express";
import { Todolist } from "../entity/todolist.entity";
import { GlobalExceptionHandler } from "../exception/global-exception.handler";
import { CreateTodoRequest } from "../interface/create-todo.interface";
import { TodolistService } from "../service/todolist.service";
import { TodolistValidate } from "../validate/todolist.validate";
import { TodoCreateDto } from "./dto/todo-create.dto";
import { TodoDto } from "./dto/todo.dto";

export class TodolistController {
    private _todolistService: TodolistService
    constructor() {
        this._todolistService = new TodolistService();
    }

    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const todolist: Todolist[] = await this._todolistService.getAll();
            res.status(200).json(todolist.map((todo) => TodoDto.fromEntity(todo)));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res)
        }
    }

    async createTodo(req: Request, res: Response): Promise<void> {
        const { task, isHighPriority }: CreateTodoRequest = req.body;
        try {
            TodolistValidate.validateCreateTodo(task, isHighPriority);
            const todo = TodoCreateDto.toEntity(
                new TodoCreateDto(task, isHighPriority)
            );
            const savedTodo = await this._todolistService.createTodo(todo);
            res.status(201).json(TodoDto.fromEntity(savedTodo));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res)
        }
    }
}
