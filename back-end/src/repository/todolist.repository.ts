import { Repository } from "typeorm";
import { Todolist } from "../entity/todolist.entity";


export class TodolistRepository extends Repository<Todolist> {
    
    async findById(id: number): Promise<Todolist | null>{
        return this.findOne({where: { id }});
    }
}