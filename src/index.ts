import { RESUME_PAGE_ID, SERVER_PORT } from "./config"
import { ContentManager } from "./managers/content"
import NotionService from "./services/notion"
import express, { Express, Request, Response } from "express"

const app: Express = express()


app.get("/resume", async (req: Request, res: Response) => {
    const manager = new ContentManager(NotionService)
    const result = await manager.getStructuredContent(RESUME_PAGE_ID)

    res.json(result)
})

app.listen(SERVER_PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${SERVER_PORT}`)
})
