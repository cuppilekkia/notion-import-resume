import { TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Prioritizable } from "../../common/prioritizable.interface"

export type BaseBlockParams = {
    id: string
    type: string
}

export class Block implements Prioritizable {
    PRIORITY = Infinity
    private id: string
    private type: string
    content: string[] = []

    constructor(params: BaseBlockParams) {
        this.id = params.id
        this.type = params.type
    }

    extractTextContent(richTexts: TextRichTextItemResponse[]): string[] {
        return richTexts.map((item: TextRichTextItemResponse) => item.text.content.trim()).filter(Boolean)
    }

    getLevel(element: Prioritizable): 0 | 1 | -1 {
        if (this.PRIORITY === Infinity) {
            throw Error(`Set a priority to this block: ${this}`)
        }

        if (this.PRIORITY === element.PRIORITY) {
            return 0
        }

        return this.PRIORITY < element.PRIORITY ? -1 : 1
    }

    toArray(): string | string[] {
        return ""
    }
}