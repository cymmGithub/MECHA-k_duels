import { NextFunction, Request, Response } from "express";
import * as path from "path";

export class ValidationError extends Error { }


export function handleError(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
        res
            .status(404)
            .sendFile('error.html', {
                root: path.join(__dirname, '../public/html/utils')
            })
        return;
    }





}
