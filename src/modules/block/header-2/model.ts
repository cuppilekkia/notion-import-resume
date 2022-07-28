import { Heading2BlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "../base-model"

export class Header2Block extends Block {
    PRIORITY = 2
    
    constructor(data: Heading2BlockObjectResponse) {
        super(data)
        this.content = this.extractTextContent(data[data.type].rich_text as TextRichTextItemResponse[])
    }

    toJson() {
        return this.content.join(" ")
    }
}