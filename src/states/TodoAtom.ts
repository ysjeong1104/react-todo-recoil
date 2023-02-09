import { atom, selector } from "recoil";
import { IToDo,Categories } from "../interface/CommonInterface";

export const categoryState = atom<Categories>({
    key : "category",
    default : Categories.TO_DO,
})

export const toDoState = atom<IToDo[]>({
    key : "toDo",
    default : []
});

export const toDoSelector = selector({
    key : "toDoSelector",
    get : ({get})=>{
        const toDos = get(toDoState);
        const category  = get(categoryState);
        return toDos.filter((todo)=> todo.category === category);
    }
});