import { ContentProvider } from "../../common/contentProvider"
import { ListFactory } from "../../modules/list/factory"

export class ContentManager {
    constructor(
        private provider: ContentProvider,
    ) {}

    async getStructuredContent(pageId: string): Promise<string | string[]> {
        const page = await this.provider.getPage(pageId)
        const blocks = await this.provider.getPageBlocks(pageId)

        const list = ListFactory.make(page, blocks)

        return list.toJson()
    }
}