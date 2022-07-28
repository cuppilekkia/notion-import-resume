import { Prioritizable } from "../../common/prioritizable.interface"

type PageParams = {
    id: string
    title: string
    pageUrl: string
    coverUrl: string | null
}

export class Page implements Prioritizable {
    PRIORITY = 0
    private id: string
    private title: string
    private pageUrl: string
    private coverUrl: string | null

    constructor(params: PageParams) {
        this.id = params.id
        this.coverUrl = params.coverUrl
        this.pageUrl = params.pageUrl
        this.title = params.title
    }

    getLevel(element: Prioritizable): 0 | 1 | -1 {
        if (this.PRIORITY === element.PRIORITY) {
            return 0
        }
        return this.PRIORITY < element.PRIORITY ? -1 : 1
    }

    toJson() {
        return [
            this.title,
        ]
    }
}