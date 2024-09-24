import { Request, Response } from "express";
import { Todo } from "../entity/todo.entity";
import { GlobalExceptionHandler } from "../exception/global-exception.handler";
import { CreateTodoRequest } from "../interface/create-todo.interface";
import { TodoService } from "../service/todo.service";
import { TodoDto } from "./dto/todo.dto";

export class TodoController {
    private _todoService: TodoService;

    constructor() {
        this._todoService = new TodoService();
    }

    async getAllTodos(_req: Request, res: Response): Promise<void> {
        try {
            const todolist: Todo[] = await this._todoService.getAllTodos();
            res.status(200).json(todolist.map((todo: Todo) => TodoDto.fromEntity(todo)));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res);
        }
    }

    async getAllFilteredTodos(req: Request, res: Response): Promise<void> {
        try {
            const filter = req.body as Partial<Todo>;
            const todolist: Todo[] = await this._todoService.getAllFilteredTodos(filter);
            res.status(200).json(todolist.map((todo: Todo) => TodoDto.fromEntity(todo)));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res);
        }
    }

    async createTodo(req: Request, res: Response): Promise<void> {
        try {
            const { task, isHighPriority } = req.body as CreateTodoRequest;
            const savedTodo: Todo = await this._todoService.createTodo(task, isHighPriority);
            res.status(201).json(TodoDto.fromEntity(savedTodo));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res);
        }
    }

    async findTodoById(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const todo: Todo = await this._todoService.findTodoById(id);
            res.status(200).json(TodoDto.fromEntity(todo));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res);
        }
    }

    async updateTodoTask(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const update: Partial<Todo> = req.body;
            const updatedTodo: Todo = await this._todoService.updateTodo(id, update);
            res.status(200).json(TodoDto.fromEntity(updatedTodo));
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res);
        }
    }

    async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const id: number = parseInt(req.params.id);
            const deletedTodo: string = await this._todoService.deleteTodo(id);
            res.status(200).json({ message: deletedTodo });
        } catch (error) {
            GlobalExceptionHandler.handleException(error as Error, res);
        }
    }
}