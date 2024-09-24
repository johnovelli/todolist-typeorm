import { EntityManager } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Todo } from "../../entity/todo.entity";
import { FindTodoTypeException } from "../../exception/find/find-todo-type.exception";
import { TodoNotFoundException } from "../../exception/find/todo-not-found.exception";
import { TodoRepository } from "../../repository/todo.repository";
import { TodoService } from "../../service/todo.service";

jest.mock('../../repository/todo.repository');

describe('TodoService - findTodoById:', () => {
  let todoService: TodoService;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    const manager = {} as EntityManager;
    const queryRunner = {} as MongoQueryRunner;
    todoRepository = new TodoRepository(Todo, manager, queryRunner) as jest.Mocked<TodoRepository>;
    todoService = new TodoService();
    todoService['_todoRepository'] = todoRepository;
  });

  it('Should find todo by id correctly.', async () => {
    const mockTodo: Todo = { id: 1, task: 'Task 1', isHighPriority: true, isComplete: false, createdAt: new Date(), updatedAt: new Date() } as Todo;
    todoRepository.findOne.mockResolvedValue(mockTodo);
    const todo = await todoService.findTodoById(mockTodo.id);
    expect(todo).toEqual(mockTodo);
  });

  it('Should throw TodoNotFoundException if todo with given id does not exist.', async () => {
    todoRepository.findOne.mockResolvedValue(null);
    await expect(todoService.findTodoById(99)).rejects.toThrow(TodoNotFoundException);
  });

  it('Should throw FindTodoTypeException if id is null.', async () => {
    await expect(todoService.findTodoById(null as any)).rejects.toThrow(FindTodoTypeException);
  });

  it('Should throw FindTodoTypeException if id is not a number.', async () => {
    await expect(todoService.findTodoById("id" as any)).rejects.toThrow(FindTodoTypeException);
  });
});
