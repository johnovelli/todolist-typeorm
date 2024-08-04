import { EntityManager } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Todo } from "../../entity/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";
import { TodoService } from "../../service/todo.service";

jest.mock('../../repository/todo.repository');

describe('TodoService - getAllTodos and getAllFilteredTodos:', () => {
  let todoService: TodoService;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    const manager = {} as EntityManager;
    const queryRunner = {} as MongoQueryRunner;
    todoRepository = new TodoRepository(Todo, manager, queryRunner) as jest.Mocked<TodoRepository>;
    todoService = new TodoService();
    todoService['_todoRepository'] = todoRepository;
  });

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
