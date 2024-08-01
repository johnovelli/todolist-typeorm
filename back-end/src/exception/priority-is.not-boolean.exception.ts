import { GlobalExceptionHandler } from "./global-exception.handler";

export class PriorityIsNotBooleanException extends GlobalExceptionHandler {
    constructor() {
        super('Priority must be a booleab', 400);
      }
}