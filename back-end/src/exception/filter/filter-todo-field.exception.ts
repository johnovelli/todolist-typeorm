import { GlobalExceptionHandler } from "../global-exception.handler";

export class FilterTodoFieldException extends GlobalExceptionHandler {
    constructor() {
        super('Filter cannot be null, must be boolean and have exactly one istance', 400);
      }
}