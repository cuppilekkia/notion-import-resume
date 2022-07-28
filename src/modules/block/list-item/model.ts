import { BulletedListItemBlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "../base-model"

export class ListItemBlock extends Block {
    PRIORITY = 4
    
    constructor(data: BulletedListItemBlockObjectResponse) {
        super(data)
        this.content = this.extractTextContent(data[data.type].rich_text as TextRichTextItemResponse[])
    }

    toArray() {
        return this.content.join(" ")
    }
}