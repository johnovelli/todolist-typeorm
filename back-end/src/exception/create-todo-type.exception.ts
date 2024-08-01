import { GlobalExceptionHandler } from "./global-exception.handler";

export class CreateTodoTypeException extends GlobalExceptionHandler {
    constructor() {
        super('Task must be string, Priority must be boolean', 400);
      }
}