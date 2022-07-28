import { PAGE_ID } from "./config"
import { ContentManager } from "./managers/content"
import NotionService from "./services/notion"


(async () => {
    const manager = new ContentManager(NotionService)
    const res = await manager.getStructuredContent(PAGE_ID)
    console.log(res)
    
    return res
})()

