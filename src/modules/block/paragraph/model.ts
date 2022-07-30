import { ParagraphBlockObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "../base-model"

export class ParagraphBlock extends Block {
    PRIORITY = 4
    
    constructor(data: ParagraphBlockObjectResponse) {
        super(data)
        this.content = this.extractTextContent(data[data.type].rich_text as TextRichTextItemResponse[])
    }

    toArray() {
        return this.content.join("")
    }

    extractTextContent(richTexts: TextRichTextItemResponse[]): string[] {
        return richTexts.map((item: TextRichTextItemResponse) => {
            let content = item.text.content.trim()
            if (item.text.link) {
                content = `[${content}](${item.text.link.url})`
            }
            return content
        }).filter(Boolean)
    }
}