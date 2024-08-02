import { EntityManager } from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import { Todo } from "../../entity/todo.entity";
import { TodoRepository } from "../../repository/todo.repository";
import { TodoService } from "../../service/todo.service";

jest.mock('../src/repository/todo.repository');

describe('TodoService', () => {
    let todoService: TodoService;
    let todoRepository: jest.Mocked<TodoRepository>;

    beforeEach(() => {
        const manager = {} as EntityManager;
        const queryRunner = {} as MongoQueryRunner;

        todoRepository = new TodoRepository(Todo, manager, queryRunner) as jest.Mocked<TodoRepository>;
        todoService = new TodoService();
        todoService['_todoRepository'] = todoRepository;
      });
})
