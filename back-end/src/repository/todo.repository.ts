import { Repository } from "typeorm";
import { Todo } from "../entity/todo.entity";


export class TodoRepository extends Repository<Todo> {
    
    async findById(id: number): Promise<Todo | null>{
        return this.findOne({where: { id }});
    }
}