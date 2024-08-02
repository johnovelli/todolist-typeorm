import { GlobalExceptionHandler } from "../global-exception.handler";

export class UpdateTodoFieldNameException extends GlobalExceptionHandler {
    constructor() {
        super('Field must be "task", "isHighPriority", or "isComplete.', 400);
      }
}