import { GlobalExceptionHandler } from "./global-exception.handler";

export class UpdateTodoFieldTypeException extends GlobalExceptionHandler {
    constructor() {
        super('Field "task" must be a string, "isHighPriority" or "isComplete" boolean.', 400);
      }
}