import React, { useEffect, useRef } from "react";
import {  useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { categoryState, selectState, toDoState } from "../states/TodoAtom"

interface IFormData{
   
    toDo : string;       
}
const CreateToDo = () =>{

    const selectRef = useRef<HTMLSelectElement>(null);
    const {handleSubmit,register,setValue} = useForm<IFormData>();
    const setToDos = useSetRecoilState(toDoState);
    const [selVal,setSelVal] = useRecoilState(selectState);
    const category = useRecoilValue(categoryState);
    const handleValid=({toDo} : IFormData)=>{              
        
        setToDos((oldToDos)=>{
                const selCate = selectRef.current?.value ?? "";

                if(selCate === ""){
                    alert("카테고리를 선택해주세요");
                    selectRef.current?.focus();
                    return oldToDos;
                }
                const newTodos= [
                    { id : Date.now(),text : toDo, category : {name : selCate}},
                    ...oldToDos
                ];               
                return newTodos;

            }
        )        
        setValue("toDo","");        
       // setError("extraError",{message : "Server is offline"});
    }
    useEffect(()=>{
        if(selVal === "" && category.length > 0 )
            setSelVal(category[0].name);
    },[])
    const onChange=(event : React.ChangeEvent<HTMLSelectElement>)=>{
        const {currentTarget:{value}} = event;


        setSelVal(value);
        //console.log(value);

        //console.log(selectRef.current?.value)
    }
    return (
        <>     
        {
            category.length > 0 && 
            <select ref={selectRef} value={selVal} onChange={onChange}>    
                <option value=''>카테고리선택</option>            
                {category.map((cate,idx)=> <option value={cate.name} key={idx}>{cate.name}</option>)}                    
            </select>
        }   
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