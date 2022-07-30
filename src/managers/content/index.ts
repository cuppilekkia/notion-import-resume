import { ContentProvider } from "../../common/contentProvider.interface"
import { ListFactory } from "../../modules/list/factory"

type StructuredContent = {
    [key: string]: Content,
}
type Content = string[] | StructuredContent[]

export class ContentManager {
    constructor(
        private provider: ContentProvider,
    ) {}

    async getRaw(pageId: string) {
        const [page, blocks] = await this.getPageBlocks(pageId)
        return [page, blocks]
    }

    async getContentArray(pageId: string): Promise<string[]> {
        const [page, blocks] = await this.getPageBlocks(pageId)

        const list = ListFactory.make(page, blocks)

        return list.toArray()
    }

    async getStructuredContent(pageId: string): Promise<StructuredContent[]> {
        const result: string[] = await this.getContentArray(pageId)

        return result.map(ContentManager.flatArray)
    }

    private getPageBlocks(pageId: string) {
        return Promise.all([
            this.provider.getPage(pageId),
            this.provider.getPageBlocks(pageId)
        ])
    }

    private static flatArray(section: any): StructuredContent {
        const [title] = section
        let [, ...rest] = section

        const restIsDeeper = rest.some((item: Content) => Array.isArray(item))
        
        if (!restIsDeeper) {
            return title
        }

        rest = rest.map(ContentManager.flatArray)

        return {
            [title]: rest
        }
    }
}