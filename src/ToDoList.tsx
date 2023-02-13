import React from "react";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";
import { ICategory} from "./interface/CommonInterface";
import { categoryState, selectState, toDoSelector } from "./states/TodoAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";

interface IFormCate{
    cateName : string;
}
const ToDoList =()=>{

    //const toDos = useRecoilValue(toDoState);
    const filteredToDo = useRecoilValue(toDoSelector);   
    const setCategoryVal = useSetRecoilState<ICategory[]>(categoryState);
    const [selVal,setSelVal] = useRecoilState(selectState);

    const {register,handleSubmit,setValue} = useForm<IFormCate>();
    
    const onCateSubmit=({cateName} : IFormCate)=>{    

       // console.log(cateName);

        setCategoryVal((oldCate)=>{
            if( oldCate.filter((cate) => cate.name === cateName).length > 0)
                return [...oldCate];

            return [...oldCate,{name:cateName}];
        })
        if(selVal === "")
            setSelVal(cateName);
        setValue("cateName","");
    }
    return (
        <div>
            <h1>Todo list</h1>
            <form onSubmit={handleSubmit(onCateSubmit)}>
                <input type='text' {...register("cateName",{required : true})} />
                <button>Create Category</button>
            </form>
            <hr/>            
            <CreateToDo />
            {
                filteredToDo.map((item)=><ToDo key={item.id} {...item} />)
            }
        </div>
    )
}
export default ToDoList;