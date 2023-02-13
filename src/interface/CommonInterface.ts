//export type categories  = "DONE" | "DOING" | "TO_DO";

export interface ICategories{
    categories : ICategory[]
}
export interface IToDo{
    id : number;
    text : string;
    category : ICategory;
}

export interface ICategory{
    name : string;
}