import { GlobalExceptionHandler } from "../global-exception.handler";

export class FindTodoTypeException extends GlobalExceptionHandler {
    constructor() {
        super('Id must be filled and must be a number', 400);
      }
}