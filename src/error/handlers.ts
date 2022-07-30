import { APIResponseError } from "@notionhq/client"
import { NextFunction, Request, Response } from "express"

export const errorHandler = (err: Error | APIResponseError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIResponseError) {
        res.status(err.status)
        res.json(JSON.parse(err.body))
    } else {
        res.status(500)
        res.json({
            error: err
        })
    }
}