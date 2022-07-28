import { Client } from "@notionhq/client"
import { BlockObjectResponse, ListBlockChildrenResponse, PageObjectResponse, PropertyItemListResponse } from "@notionhq/client/build/src/api-endpoints"
import { ContentProvider } from "src/common/contentProvider"
import { Block } from "../../modules/block/base-model"
import { BlockFactory } from "../../modules/block/factory"
import { PageFactory } from "../../modules/page/factory"
import { Page } from "../../modules/page/model"

const notion = new Client({ auth: process.env.NOTION_KEY })
const PROP_TITLE_ID = "title"

class NotionService implements ContentProvider{
    private client: Client

    constructor(client: Client) {
        this.client = client
    }

    async getPage(pageId: string): Promise<Page> {
        const [page, title] = await Promise.all([
            this.client.pages.retrieve({ page_id: pageId }) as Promise<PageObjectResponse>,
            this.client.pages.properties.retrieve({ page_id: pageId, property_id: PROP_TITLE_ID }) as Promise<PropertyItemListResponse>
        ])
        
        return PageFactory.make(page, title)
    }

    async getPageBlocks(pageId: string): Promise<Block[]> {
        const { results } = await this.client.blocks.children.list({ block_id: pageId }) as ListBlockChildrenResponse
        
        return BlockFactory.makeFromList(results as BlockObjectResponse[])
    }
}

export default new NotionService(notion)