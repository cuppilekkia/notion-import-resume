import { Block } from "src/modules/block/base-model"
import { Page } from "src/modules/page/model"

export interface ContentProvider {
    getPage(pageId: string): Promise<Page>
    getPageBlocks(pageId: string): Promise<Block[]>
}