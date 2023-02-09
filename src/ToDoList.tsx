import React, { useEffect } from "react";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";
import { Categories} from "./interface/CommonInterface";
import { categoryState, toDoSelector, toDoState } from "./states/TodoAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";


const ToDoList =()=>{

    //const toDos = useRecoilValue(toDoState);
    const filteredToDo = useRecoilValue(toDoSelector);   
    const [categoryVal,setCategoryVal] = useRecoilState(categoryState);
    const setTodos = useSetRecoilState(toDoState);
    const onChange=(event : React.ChangeEvent<HTMLSelectElement>)=>{
        const {currentTarget:{value}} = event;
        setCategoryVal(value as Categories);
        //console.log(event.currentTarget.value);
    }

    useEffect(()=>{ //localStorage load
        const storageTodo  = localStorage.getItem("toDos");        
        setTodos(JSON.parse(storageTodo ? storageTodo : ""));
    },[])
    return (
        <div>
            <h1>Todo list</h1>
            <hr/>
            <select value={categoryVal} onChange={onChange}>                
                <option value={Categories.TO_DO}>TO DO</option>
                <option value={Categories.DOING}>DOING</option>
                <option value={Categories.DONE}>DONE</option>
            </select>
            <CreateToDo />
            {
                filteredToDo.map((item)=><ToDo key={item.id} {...item} />)
            }
        </div>
    )
}
export default ToDoList;