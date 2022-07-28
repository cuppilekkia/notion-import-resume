import { ParagraphBlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "../base-model"

export class ParagraphBlock extends Block {
    PRIORITY = 4
    
    constructor(data: ParagraphBlockObjectResponse) {
        super(data)
        this.content = this.extractTextContent(data[data.type].rich_text as TextRichTextItemResponse[])
    }

    toJson() {
        return this.content.join("")
    }
}