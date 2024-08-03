import { EntityManager } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Todo } from "../../entity/todo.entity";
import { CreateTodoNullException } from "../../exception/create/create-todo-null.exception";
import { CreateTodoTypeException } from "../../exception/create/create-todo-type.exception";
import { FindTodoTypeException } from "../../exception/find/find-todo-type.exception";
import { TodoNotFoundException } from "../../exception/find/todo-not-found.exception";
import { TodoRepository } from "../../repository/todo.repository";
import { TodoService } from "../../service/todo.service";

jest.mock('../../repository/todo.repository');

describe('TodoService:', () => {
  let todoService: TodoService;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    const manager = {} as EntityManager;
    const queryRunner = {} as MongoQueryRunner;
    todoRepository = new TodoRepository(Todo, manager, queryRunner) as jest.Mocked<TodoRepository>;
    todoService = new TodoService();
    todoService['_todoRepository'] = todoRepository;
  });

  describe('Test getAllTodos and getAllFilteredTodos:', () => {

    it('GetAllTodos should return list of todo in right order.', async () => {
      const mockTodos: Todo[] = [
        { id: 1, task: 'Task 1', isHighPriority: false, isComplete: true, createdAt: new Date(), updatedAt: new Date() } as Todo,
        { id: 2, task: 'Task 2', isHighPriority: true, isComplete: false, createdAt: new Date(), updatedAt: new Date() } as Todo,
      ];
      todoRepository.find.mockResolvedValue(mockTodos);
      const todos = await todoService.getAllTodos();
      expect(todos).toEqual(mockTodos);
      expect(todoRepository.find).toHaveBeenCalledWith({
        order: {
          isHighPriority: 'DESC',
          updatedAt: 'DESC',
          createdAt: 'DESC',
        }});
    });

    it('GetAllTodosFiltered should return list of filtered todo in right order.', async () => {
      const mockFilterTodos: Todo[] = [
        { id: 1, task: 'Task 1', isHighPriority: false, isComplete: true, createdAt: new Date(), updatedAt: new Date() } as Todo,
        { id: 2, task: 'Task 2', isHighPriority: true, isComplete: true, createdAt: new Date(), updatedAt: new Date() } as Todo,
        { id: 3, task: 'Task 3', isHighPriority: true, isComplete: true, createdAt: new Date(), updatedAt: new Date() } as Todo,
      ];
      todoRepository.find.mockResolvedValue(mockFilterTodos);
      const todos = await todoService.getAllFilteredTodos({ isComplete: true });
      expect(todos).toEqual(mockFilterTodos);
      expect(todoRepository.find).toHaveBeenCalledWith({
        where: { isComplete: true },
        order: {
          updatedAt: 'DESC',
          createdAt: 'DESC',
        }
      });
    });
  });

  describe('Test createTodo:', () => {

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

    it('Should throw CreateTodoNullException if task is not a string.', async () => {
      await expect(todoService.createTodo(1 as any, true)).rejects.toThrow(CreateTodoTypeException);
    });

    it('Should throw CreateTodoNullException if isHighPriority is not a boolean.', async () => {
      await expect(todoService.createTodo("task", 1 as any)).rejects.toThrow(CreateTodoTypeException);
    });
  });

  describe('Test findTodoById:', () => {
    it('Should find todo by id correctly.', async () => {
      const mockTodo: Todo = { id: 1, task: 'Task 1', isHighPriority: true, isComplete: false, createdAt: new Date(), updatedAt: new Date() } as Todo;
      todoRepository.findOne.mockResolvedValue(mockTodo);
      const todo = await todoService.findTodoById(1);
      expect(todo).toEqual(mockTodo);
    });

    it('Should throw TodoNotFoundException if todo with given id does not exist.', async () => {
      todoRepository.findOne.mockResolvedValue(null);
      await expect(todoService.findTodoById(99)).rejects.toThrow(TodoNotFoundException);
    });

    it('Should throw CreateTodoNullException if id is null.', async () => {
      await expect(todoService.findTodoById(null as any)).rejects.toThrow(FindTodoTypeException);
    });

    it('Should throw CreateTodoNullException if id is not a number.', async () => {
      await expect(todoService.findTodoById("id" as any)).rejects.toThrow(FindTodoTypeException);
    });
  });
});
