import { Link,useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react";
import { UserSigninValidation } from "@devbisht9891/common1/src/UserValidation";

const Signin = ():any=>{
    
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');

    const navigate = useNavigate();

    const submitHandler = async (e:any)=>{
         e.preventDefault();
         const url = "http://localhost:8080/api/v1/user/signin";
         const body:UserSigninValidation = {email , password}
          const res = await axios.post(url,body);
         if(res.statusText === "OK"){
            window.localStorage.setItem("JWT",res.data.token)
            localStorage.setItem("userId",res.data.userId)
            navigate('/')
            setEmail("")
            setPassword("")
         }
    }

      return (
        <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-white w-[80%] md:w-[80%] h-[80%] md:h-[70%] shadow-lg">
            <div className="md:w-1/2 bg-indigo-900 px-8 py-12">
                <div className="text-center mb-8 ">
                    <h2 className="text-5xl font-bold text-white">Sign In</h2>
                </div>
                <form onSubmit={submitHandler} className="space-y-4 ">
                    <Input setChange={setEmail} text="Email" type="text" />
                    <Input setChange={setPassword} text="Password" type="password" />
                    <div className="text-center">
                         <button className="w-[69%] h-10 rounded-md bg-red-500 text-white text-xl font-bold">Sign In</button>
                   </div>
                   <div className="text-center">
                     <Link to={'/signup'}><p className="underline text-white font-bold ">Don't have an account? Sign up</p></Link>
                   </div>
                </form>
            </div>
            <div className="text-center hidden md:block w-1/2  bg-slate-300 " >
                 <h1 className="mt-32 text-black text-5xl font-bold font-italic font-serif underline">MEDIUM</h1>
                 <p className="mt-8 text-black text-2xl font-bold font-serif">EVERYDAY IS A WHOLE NEW BEGINNING , WHAT YOU WAITING FOR KILL IT!</p>
            </div>
        </div>
    </div>
      )
}

const Input = ({ text , type,setChange}: {text:string,type:string,setChange:any}) => {
    return (
        <div className="text-center p-2">
            <input onChange={(e)=> setChange(e.target.value)} className="w-[70%] rounded-md h-8 text-center" type={type} placeholder={text} />
        </div>
    )
}

export default Signin