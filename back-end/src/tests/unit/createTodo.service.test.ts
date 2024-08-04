import { EntityManager } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Todo } from "../../entity/todo.entity";
import { CreateTodoNullException } from "../../exception/create/create-todo-null.exception";
import { CreateTodoTypeException } from "../../exception/create/create-todo-type.exception";
import { TodoRepository } from "../../repository/todo.repository";
import { TodoService } from "../../service/todo.service";

jest.mock('../../repository/todo.repository');

describe('TodoService - createTodo:', () => {
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
});
