import { GlobalExceptionHandler } from "./global-exception.handler";

export class GetAllFetchException extends GlobalExceptionHandler {
    constructor() {
        super('Unable to fetch todos at the moment', 400);
      }
}