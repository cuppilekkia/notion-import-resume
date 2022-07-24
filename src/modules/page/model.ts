type PageParams = {
    id: string
    title: string
    pageUrl: string
    coverUrl: string | null
}

export class Page {
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
}