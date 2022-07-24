import { PageObjectResponse, PropertyItemListResponse, TitlePropertyItemObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import {Page} from "./model"

export class PageFactory {
    static make(pageData: PageObjectResponse, titleData: PropertyItemListResponse): Page {
        let coverUrl = null

        if (pageData.cover) {
            coverUrl = pageData.cover.type === "external" ? pageData.cover.external.url : pageData.cover.file.url
        }

        const title = PageFactory.extractTitle(titleData)

        const page = {
            id: pageData.id,
            coverUrl,
            title,
            pageUrl: pageData.url
        }

        return new Page(page)
    }

    private static extractTitle(titleData: PropertyItemListResponse): string {
        const objTitle = titleData.results[0] as TitlePropertyItemObjectResponse
        return objTitle.title.plain_text.trim()
    }
}
