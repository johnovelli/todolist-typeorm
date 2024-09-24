import express from 'express';
import { Request , Response } from "express";
import 'reflect-metadata';
import { TodoController } from './controller/todo.controller';
const todoController: TodoController = new TodoController();

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send('Application is running'));

app.get('/todolist', (_req: Request, res: Response) => todoController.getAllTodos(_req, res));
app.post('/todolist', (req: Request, res: Response) => todoController.createTodo(req, res));
app.get('/todolist/filtered', (req: Request, res: Response) => todoController.getAllFilteredTodos(req, res));
app.get('/todolist/:id', (req, res) => todoController.findTodoById(req, res));
app.put('/todolist/:id', (req, res) => todoController.updateTodoTask(req, res));
app.delete('/todolist/:id', (req, res) => todoController.deleteTodo(req, res));

export default app;