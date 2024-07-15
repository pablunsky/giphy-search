export interface IPost {
    id: string
    title: string
}

export interface IGifResult {
    id: string
    images: {
        preview_gif: {
            url: string
        }
    }
}

export interface IResponse {
    data: IGifResult[]
    meta: IMeta
    pagination: IPagination
}

export interface IMeta { }

export interface IPagination {
    total_count: number
    count: number
    offset: number
}