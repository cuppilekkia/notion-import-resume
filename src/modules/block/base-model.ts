import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"

export type BaseBlockParams = {
    id: string
    type: string
}

export class Block {
    private id: string
    private type: string

    constructor(params: BaseBlockParams) {
        this.id = params.id
        this.type = params.type
    }

    extractTextContent(richTexts: TextRichTextItemResponse[]): string[] {
        return richTexts.map((item: TextRichTextItemResponse) => item.text.content.trim()).filter(Boolean)
    }
}