import { EntityManager, DeleteResult } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Todo } from "../../entity/todo.entity";
import { CreateTodoNullException } from "../../exception/create/create-todo-null.exception";
import { CreateTodoTypeException } from "../../exception/create/create-todo-type.exception";
import { TodoRepository } from "../../repository/todo.repository";
import { TodoService } from "../../service/todo.service";
import {TodoNotFoundException} from "../../exception/find/todo-not-found.exception";

jest.mock('../../repository/todo.repository');

describe('TodoService - createTodo and deleteTodo:', () => {
  let todoService: TodoService;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    const manager = {} as EntityManager;
    const queryRunner = {} as MongoQueryRunner;
    todoRepository = new TodoRepository(Todo, manager, queryRunner) as jest.Mocked<TodoRepository>;
    todoService = new TodoService();
    todoService['_todoRepository'] = todoRepository;
  });

  it('Should create correctly new todo.', async () => {
    const mockTodo: Todo = { id: 1, task: 'Task 1', isHighPriority: true, isComplete: false, createdAt: new Date(), updatedAt: new Date() } as Todo;
    todoRepository.save.mockResolvedValue(mockTodo);
    const todo = await todoService.createTodo("Task 1", true);
    expect(todo).toEqual(mockTodo);
  });

  it('Should throw CreateTodoNullException if task is null.', async () => {
    await expect(todoService.createTodo(null as any, true)).rejects.toThrow(CreateTodoNullException);
  });

  it('Should throw CreateTodoNullException if task is empty.', async () => {
    await expect(todoService.createTodo("", true)).rejects.toThrow(CreateTodoNullException);
  });

  it('Should throw CreateTodoNullException if isHighPriority is null.', async () => {
    await expect(todoService.createTodo("task", null as any)).rejects.toThrow(CreateTodoNullException);
  });

  it('Should throw CreateTodoTypeException if task is not a string.', async () => {
    await expect(todoService.createTodo(1 as any, true)).rejects.toThrow(CreateTodoTypeException);
  });

  it('Should throw CreateTodoTypeException if isHighPriority is not a boolean.', async () => {
    await expect(todoService.createTodo("task", 1 as any)).rejects.toThrow(CreateTodoTypeException);
  });


  it('Should delete a todo and return a confirmation message.', async () => {
    const mockTodo: Todo = { id: 1, task: 'Task 1', isHighPriority: true, isComplete: false, createdAt: new Date(), updatedAt: new Date() } as Todo;
    todoRepository.findOne.mockResolvedValue(mockTodo);
    todoRepository.delete.mockResolvedValue({ affected: 1 } as DeleteResult);
    const result = await todoService.deleteTodo(1);
    expect(result).toEqual(`Task: ${mockTodo.task} removed from db.`);
  });

  it('Should throw TodoNotFoundException if todo with given id does not exist.', async () => {
    todoRepository.findOne.mockResolvedValue(null);
    await expect(todoService.findTodoById(99)).rejects.toThrow(TodoNotFoundException);
  });
});