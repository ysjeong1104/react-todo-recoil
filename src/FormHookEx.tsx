import React, { useState } from "react";
import { useForm } from "react-hook-form";

/*
const ToDoList =()=>{

    const [toDo, setToDo] = useState("");
    const [toDoError, setToDoError] = useState("");
    const onChange=(e : React.FormEvent<HTMLInputElement>)=>{

        const {currentTarget : {value}} = e;
        setToDoError("")
        setToDo(value)
    }

    const onSubmit=(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(toDo.length < 10)
            setToDoError("toDo is very short ");
        console.log("submit");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="write a Todo" onChange={onChange} value={toDo}/>
                <button>Add</button>
                {toDoError!== "" ? toDoError : null }
            </form>
        </div>
    )
}
*/

interface IFormData{
    errors : {
        email : {
            message : string;
        }
    };
    todo : string;
    email : string;
    todo2 : string;
    password : string;
    password2 : string;

    extraError?:string;
}
const FormHookEx =()=>{
    const {register /* form element 등록 */
        , watch /* element 수정이 있을때 마다 동작*/
        , handleSubmit
        , formState :{errors} /* form element 상태 체크 validate */
        , setError  //custom  error 발생시킬수 있음
     //   , setValue // 요청하는 Element 의 값을 수정
    } = useForm<IFormData>({
        defaultValues : { //기본값 지정 가능 
            todo : "",
            email : "@naver.com",
            todo2 : ""
        }
    });    //form 사용할때 react-hook-form 라이브러리가 코드를 줄여줌
    
    const fieldErrors = errors;    
    const onValid=(data : IFormData)=>{
        console.log(data);
        if(data.password !== data.password2){
            setError("password2",{message : "password are not same"},{shouldFocus : true})
        }
       // setError("extraError",{message : "Server is offline"});
    }

    return (
        <div>
            <form style={{display:"flex",flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("todo",
                        {   
                            required : "todo is requires ",
                            minLength: {message :  "todo over 10 char",value : 10 },
                            validate :  {
                               isYsIn : (value)=> value.includes("ys") ? true :"no" , //async사용하여 서버통신도 가능 validate 함수 여러개 사용가능
                            }
                        }
                    )
                    } type="text" placeholder="write a Todo" />
                <span>    
                    {fieldErrors.todo?.message}               
                </span>
                <input {...register("email",
                        {   
                            required : "email is requires ",
                            pattern : {
                                value : /^[A-Za-z0-9._%+-]+@naver.com$/,
                                message : "only naver.com email address input"
                            },
                            maxLength: {message :  "email no over 60 char",value : 60 }
                        }
                    )
                    } type="text" placeholder="input your email" />
                <span>    
                    {fieldErrors.email?.message}               
                </span>
                <input {...register("todo2",{required : true,})} type="text" placeholder="write a Todo" />
                <span>    
                    {fieldErrors.todo2?.message}               
                </span>
                <input {...register("password",{required : "write here", 
                    minLength : {
                        value : 8,
                        message : "비밀번호 최소 8자리!!"
                    }, 
                    maxLength:{
                        value : 15,
                        message : "비밀번호 최대 15자리!!"
                    }})} type="text" placeholder="password here" />
                <span>    
                    {fieldErrors.password?.message}               
                </span>
                <input {...register("password2",{required : "write here", 
                    minLength : {
                        value : 8,
                        message : "비밀번호 최소 8자리!!"
                    }, 
                    maxLength:{
                        value : 15,
                        message : "비밀번호 최대 15자리!!"
                    }})} type="text" placeholder="confirm password" />
                <span>    
                    {fieldErrors.password2?.message}               
                </span>
                <button>Add</button>   
                <span>{fieldErrors.extraError?.message}</span>            
            </form>
        </div>
    )
}
export default FormHookEx;