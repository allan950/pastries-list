export interface Pastries {
    id: string,
    ref: string,
    name: string,
    description: string,
    url: string,
    quantity: number,
    order: number,
    tags?: Array<string>,
    like?: string,
    priority?: boolean,
}

export interface Ingredients_list {
    id: string,
    list: Array<string>,
}

export enum BtnState {
    Asc = "Asc",
    Desc = "Desc"
}

export enum Priority {
    Clicked = "[Priority]",
    Unclicked = "",
}