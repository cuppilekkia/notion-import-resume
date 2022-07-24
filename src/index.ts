import "dotenv/config"
import NotionService from "./services/notion";


(async () => {
    const pageId = "3f54882e312c488dabe9f5749c302bd4"
    
    const page = await NotionService.getPage(pageId)
    console.log(page)
    
    const blocks = await NotionService.getPageBlocks(pageId)
    console.log(blocks.length)
    console.log(blocks)
})()

