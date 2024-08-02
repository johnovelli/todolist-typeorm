import { GlobalExceptionHandler } from "./global-exception.handler";

export class UpdateTodoFieldException extends GlobalExceptionHandler {
    constructor() {
        super('Field cannot be null and must contain exactly one field.', 400);
      }
}