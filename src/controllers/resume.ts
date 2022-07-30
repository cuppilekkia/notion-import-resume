import { NextFunction, Request, Response } from "express"
import { RESUME_PAGE_ID } from "../config"
import { ContentManager } from "../managers/content"
import NotionService from "../services/notion"

class ResumeController {
    show(req: Request, res: Response, next: NextFunction) {
        const manager = new ContentManager(NotionService)
        manager.getStructuredContent(RESUME_PAGE_ID).then(result =>{
            res.json(result)
        }).catch(next)

    }

    showRaw(req: Request, res: Response, next: NextFunction) {
        const manager = new ContentManager(NotionService)
        manager.getRaw(RESUME_PAGE_ID).then(result => {
            res.json(result)
        }).catch(next)
    }
}

export const resumeController = new ResumeController()