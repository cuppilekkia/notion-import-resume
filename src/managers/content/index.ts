import { ContentProvider } from "../../common/contentProvider"
import { ListFactory } from "../../modules/list/factory"

type StructuredContent = {
    title?: string,
    content?: Content
}
type Content = string[] | StructuredContent[]

export class ContentManager {
    constructor(
        private provider: ContentProvider,
    ) {}

    async getContentArray(pageId: string): Promise<string[]> {
        const page = await this.provider.getPage(pageId)
        const blocks = await this.provider.getPageBlocks(pageId)

        const list = ListFactory.make(page, blocks)

        return list.toArray()
    }

    async getStructuredContent(pageId: string): Promise<StructuredContent[]> {
        const result: string[] = await this.getContentArray(pageId)

        return result.map(ContentManager.flatArray)
    }

    private static flatArray(section: any): StructuredContent {
        const [title] = section
        let [, ...rest] = section

        const restIsDeeper = rest.some((item: Content) => Array.isArray(item))
        
        if (!restIsDeeper) {
            return title
        }

        rest = rest.map(ContentManager.flatArray)

        const result: StructuredContent = {}
        result.title = title

        if (rest.length) {
            result.content = rest
        }
        return result
    }
}