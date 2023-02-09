//export type categories  = "DONE" | "DOING" | "TO_DO";

export enum Categories{
    "TO_DO"="TO_DO", //지정하지 않으면 enum은 숫자로 인식
    "DOING"="DOING",
    "DONE"="DONE"
}
export interface IToDo{
    id : number;
    text : string;
    category : Categories;

}