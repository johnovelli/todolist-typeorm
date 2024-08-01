import { GlobalExceptionHandler } from "./global-exception.handler";

export class TaskIsNotStringException extends GlobalExceptionHandler {
    constructor() {
        super('Task must be a string', 400);
      }
}