import { Response } from "express";

export abstract class GlobalExceptionHandler extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }

    static handleException(error: Error, res: Response) {
        if (error instanceof GlobalExceptionHandler) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

