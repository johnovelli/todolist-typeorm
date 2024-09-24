import { Repository } from "typeorm";
import { Todo } from "../entity/todo.entity";

export class TodoRepository extends Repository<Todo> {}
