import { Request, Response } from "express";
import { Todolist } from "../entity/todolist.entity";
import { GlobalExceptionHandler } from "../exception/global-exception.handler";
import { TodolistService } from "../service/todolist.service";
import { TodoCreateDto } from "./dto/todo-create.dto";
import { TodolistValidator } from "./validator/todolist.validator";

export class TodolistController {
    private _todolistService: TodolistService

    constructor() {
        this._todolistService = new TodolistService();
    }

    async getAll(_req: Request, res: Response) {
        try {
            const todolist: Todolist[] = await this._todolistService.getAll();
            res.status(200).json(todolist);
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res)
        }
    }

    async createTodo(req: Request, res: Response) {
        const { task, isHighPriority } = req.body;
        try {
            TodolistValidator.validateCreateTodo(task, isHighPriority);
            const todo = TodoCreateDto.toEntity(
                new TodoCreateDto(task, isHighPriority)
            );
            const savedTodo = await this._todolistService.createTodo(todo);
            res.status(201).json(savedTodo);
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res)
        }
    }
}
