import express from 'express';
import 'reflect-metadata';
import { TodolistController } from './controller/todolist.controller';
const todolistController = new TodolistController();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/todolist', (_req, res) => todolistController.getAll(_req, res));

app.post('/todolist', (req, res) => todolistController.createTodo(req, res));



export default app;