import { Heading3BlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "../base-model"

export class Header3Block extends Block {
    PRIORITY = 3
    
    constructor(data: Heading3BlockObjectResponse) {
        super(data)
        this.content = this.extractTextContent(data[data.type].rich_text as TextRichTextItemResponse[])
    }

    toJson() {
        return this.content.join(" ")
    }
}