import React from "react";
import {  useRecoilState, useRecoilValue } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, toDoState } from "../states/TodoAtom"

interface IFormData{
   
    toDo : string;       
}
const CreateToDo = () =>{

    const {handleSubmit,register,setValue} = useForm<IFormData>();
    const [toDos,setToDos] = useRecoilState(toDoState);
    const category = useRecoilValue(categoryState)
    const handleValid=({toDo} : IFormData)=>{                
        setToDos(oldToDos=>[
            { id : Date.now(),text : toDo, category : category},
            ...oldToDos
        ])

        localStorage.setItem("toDos",JSON.stringify( toDos))
        setValue("toDo","");

        
       // setError("extraError",{message : "Server is offline"});
    }

    return (
        <>        
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo",{
                required : "please Write a todo"
            })}  
            placeholder="Write a todo"
            /> 
            <button>Add</button>
        </form>
        </>
    );
}

export default CreateToDo;