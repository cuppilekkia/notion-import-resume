import { BlockObjectResponse, BulletedListItemBlockObjectResponse, Heading1BlockObjectResponse, Heading2BlockObjectResponse, Heading3BlockObjectResponse, ParagraphBlockObjectResponse, QuoteBlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block } from "./base-model"
import { Header1Block } from "./header-1/model"
import { Header2Block } from "./header-2/model"
import { Header3Block } from "./header-3/model"
import { ListItemBlock } from "./list-item/model"
import { ParagraphBlock } from "./paragraph/model"
import { QuoteBlock } from "./quote/model"

export class BlockFactory {
    private static BLOCK_TYPES = {
        QUOTE: "quote",
        PARA: "paragraph",
        H1: "heading_1",
        H2: "heading_2",
        H3: "heading_3",
        CALLOUT: "callout",
        LI: "bulleted_list_item",
        NI: "numbered_list_item",
    }
    private static ALLOWED_BLOCKS = [
        BlockFactory.BLOCK_TYPES.QUOTE,
        BlockFactory.BLOCK_TYPES.PARA,
        BlockFactory.BLOCK_TYPES.H1,
        BlockFactory.BLOCK_TYPES.H2,
        BlockFactory.BLOCK_TYPES.H3,
        BlockFactory.BLOCK_TYPES.LI,
    ]

    static make(blockData: BlockObjectResponse): Block {
        switch (blockData.type) {
        case BlockFactory.BLOCK_TYPES.QUOTE:
            return new QuoteBlock(blockData as QuoteBlockObjectResponse)
        case BlockFactory.BLOCK_TYPES.PARA:
            return new ParagraphBlock(blockData as ParagraphBlockObjectResponse)
        case BlockFactory.BLOCK_TYPES.H1:
            return new Header1Block(blockData as Heading1BlockObjectResponse)
        case BlockFactory.BLOCK_TYPES.H2:
            return new Header2Block(blockData as Heading2BlockObjectResponse)
        case BlockFactory.BLOCK_TYPES.H3:
            return new Header3Block(blockData as Heading3BlockObjectResponse)
        case BlockFactory.BLOCK_TYPES.LI:
            return new ListItemBlock(blockData as BulletedListItemBlockObjectResponse)
        
        default:
            return new Block({ 
                id: blockData.id,
                type: blockData.type,
            })
        }
    }

    static makeFromList(blockList: BlockObjectResponse[]): Block[] {
        const list = blockList
            .filter(BlockFactory.filterAllowedBlocks)
            .filter(BlockFactory.filterEmptyBlocks)

        return list.map((item) => BlockFactory.make(item))
    }

    private static filterAllowedBlocks(blockData: BlockObjectResponse) {
        return BlockFactory.ALLOWED_BLOCKS.includes(blockData.type)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static filterEmptyBlocks(blockData: any) {
        const texts: RichTextItemResponse[] = blockData[blockData.type].rich_text
        return texts.some((text) => text.plain_text !== "")
    }
}