import { GlobalExceptionHandler } from "../global-exception.handler";

export class TodoNotFoundException extends GlobalExceptionHandler {
    constructor() {
        super('Todo not found.', 404);
      }
}