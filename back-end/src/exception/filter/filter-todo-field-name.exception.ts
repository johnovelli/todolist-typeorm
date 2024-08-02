import { GlobalExceptionHandler } from "../global-exception.handler";

export class FilterTodoFieldNameException extends GlobalExceptionHandler {
    constructor() {
        super('Field must be "isHighPriority" or "isComplete.', 400);
      }
}