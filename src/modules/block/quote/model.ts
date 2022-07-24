import { QuoteBlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "../base-model"

export class QuoteBlock extends Block {
    private content: string[]

    constructor(data: QuoteBlockObjectResponse) {
        super(data)
        this.content = this.extractTextContent(data[data.type].rich_text as TextRichTextItemResponse[])
    }
}