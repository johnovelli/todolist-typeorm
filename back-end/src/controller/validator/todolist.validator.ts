import { EmptyTaskException } from "../../exception/empty-task.exception";
import { PriorityIsNotBooleanException } from "../../exception/priority-is.not-boolean.exception";
import { TaskIsNotStringException } from "../../exception/task-is-not-string.exception";

export class TodolistValidator {

    static validateCreateTodo(task: string, isHighPriority: boolean) {
        if (typeof task !== 'string') throw new TaskIsNotStringException();
        if (typeof isHighPriority !== 'boolean') throw new PriorityIsNotBooleanException();
        if (!task.trim()) throw new EmptyTaskException();
    }
}
