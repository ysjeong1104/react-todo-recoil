import React from "react";
import {  useSetRecoilState } from "recoil";
import { Categories, IToDo } from "../interface/CommonInterface";
import { toDoState } from "../states/TodoAtom";

const ToDo = ({id,text,category} : IToDo) =>{

    const setToDos =  useSetRecoilState(toDoState);

    const onClick=(event : React.MouseEvent<HTMLButtonElement>)=>{
        
        //  setToDos()
        const {currentTarget:{name}} = event
    
        setToDos((oldToDos)=>{

            let newToDos : IToDo[] =[];
            console.log(name);
            if(name !== "DEL"){
                const targetIndex = oldToDos.findIndex((todo)=>todo.id === id); //index 찾고
                const oldTodo = oldToDos[targetIndex];             //객체 저장
                const newToDo  = {...oldTodo,category: name as Categories}; //값 변경

                newToDos =  [...oldToDos.slice(0,targetIndex),
                        newToDo,
                        ...oldToDos.slice(targetIndex+1,oldToDos.length)];
            }
            else{
                newToDos = oldToDos.filter(item=> item.id !== id); // Delete Todo
            }
            localStorage.setItem("toDos",JSON.stringify( newToDos)) //save to LocalStorage Todo 
            return newToDos;
        })
  
     }
    return (
        <li>
            <span>{text}</span>                         
            {category!==Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category!==Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>ToDo</button>}
            {category!==Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
            <button name='DEL' onClick={onClick} >Delete</button>

        </li>
    );
}

export default ToDo;