import express from 'express';
import 'reflect-metadata';
import { TodoController } from './controller/todo.controller';
const todoController = new TodoController();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/todolist', (_req, res) => todoController.getAll(_req, res));

app.post('/todolist', (req, res) => todoController.createTodo(req, res));

app.get('/todolist/:id', (req, res) => todoController.findTodoById(req, res));

app.put('/todolist/:id', (req, res) => todoController.updateTodoTask(req, res));

export default app;