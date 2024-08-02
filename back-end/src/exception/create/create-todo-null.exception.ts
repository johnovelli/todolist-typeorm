import { GlobalExceptionHandler } from "../global-exception.handler";

export class CreateTodoNullException extends GlobalExceptionHandler {
    constructor() {
        super('Task and Priority must be filled', 400);
      }
}