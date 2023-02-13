import { atom, selector } from "recoil";
import { IToDo, ICategory } from "../interface/CommonInterface";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist({  //localstorage 에 todo 저장
    key: "persisStates",
    storage : localStorage
});

export const selectState = atom<string>({
    key : "cateSelect",
    default : "" ,
    effects_UNSTABLE : [persistAtom]
})

export const categoryState = atom<ICategory[]>({
    key : "category",
    default : [] ,
    effects_UNSTABLE : [persistAtom]
})

export const toDoState = atom<IToDo[]>({
    key : "toDo",
    default : [],
    effects_UNSTABLE : [persistAtom]
});

export const toDoSelector = selector({
    key : "toDoSelector",
    get : ({get})=>{
        const toDos = get(toDoState);
        const category  = get(selectState);

       // console.log(category);
       // console.log("aa")
       // return toDos;
        return toDos.filter((todo)=> todo.category.name === category);
    }
});

 /**
  * category, todos[]
  * 
  */