import { GlobalExceptionHandler } from "./global-exception.handler";

export class EmptyTaskException extends GlobalExceptionHandler {
    constructor() {
        super('Task must be filled', 404);
      }
}