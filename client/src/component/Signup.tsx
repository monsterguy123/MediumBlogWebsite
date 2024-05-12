import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"

const Signup = (): any => {

    const [name,setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [img, setImg] = useState<File | null>(null);
 
     const navigate = useNavigate();
 
     const SignupHandler = async (e: any) => {
        e.preventDefault();
        try{
        const formData = new FormData();
        if (img) {
            formData.append('file', img);
        }
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

            const url: string = "http://localhost:8080/api/v1/user/SignUp";
            const res = await axios.post(url, formData);
            if (res.status === 200) {
                resetForm();
                navigate('/');
            }
        } catch (error:any) {
            console.log(error.message)
        }
    }

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setImg(null);
    };
    return (
        <>
     <div className="flex h-screen justify-center items-center bg-gray-100">
    <div className="flex flex-col md:flex-row border rounded-lg overflow-hidden bg-white w-[80%] md:w-[80%] h-[80%] md:h-[70%] shadow-lg">
        <div className="md:w-1/2 bg-indigo-900 px-8 py-12">
            <div className="text-center mb-8 ">
                <h2 className="text-5xl font-bold text-white">Sign Up</h2>
                <p className="text-2xl text-gray-300 mt-3">Create your account</p>
            </div>
            <form  onSubmit={SignupHandler} className="space-y-4 ">
            <div className="text-center">
                <input onChange={(e:any)=>setImg(e.target.files[0])} className="w-[70%] rounded-md border-2 solid-blackh-8 text-center" type="file" placeholder="User Profile"/>
             </div>
                <Input setChange={setName} text="Name" />
                <Input setChange={setEmail} text="Email" type="email" />
                <Input setChange={setPassword} text="Password" type="password" />
                <div className="text-center">
                     <button  className="w-[69%] h-10 rounded-md bg-red-500 text-white text-xl font-bold">Sign Up</button>
               </div>
               <div className="text-center">
                 <Link to={'/signin'}> <p className="underline text-white font-bold ">Already have an account? Sign In</p></Link>
               </div>
            </form>
        </div>
        <div className="text-center hidden md:block w-1/2  bg-slate-300 " >
             <h1 className="mt-32 text-black text-5xl font-bold font-italic font-serif underline">MEDIUM</h1>
             <p className="mt-8 text-black text-2xl font-bold font-serif">Embark on a Journey of Insight and Inspiration: Join Our Community Today!</p>
        </div>
    </div>
</div>
        </>
    )
}


const Input = ({ text , type,setChange}: any) => {
    return (
        <div className="text-center">
            <input onChange={(e)=> setChange(e.target.value)} className="w-[70%] rounded-md h-8 text-center" type={type} placeholder={text} />
        </div>
    )
}


export default Signup