import "dotenv/config"
import NotionService from "./services/notion";


(async () => {
    const pageId = process.env.RESUME_PAGE_ID || ""
    
    const page = await NotionService.getPage(pageId)
    console.log(page)
    
    const blocks = await NotionService.getPageBlocks(pageId)
    console.log(blocks.length)
    console.log(blocks)
})()

