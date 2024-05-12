import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'


const CardComponent = () => {

    const [Info, setInfo] = useState<[]>([]);
    const [categories , setCategories] = useState<string>('all')

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://localhost:8080/api/v1/post/getallpost/${categories}`
            const jwt = window.localStorage.getItem("JWT")
            const res = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (res.statusText === "OK") {
                setInfo(res.data.posts)
            }
        }
        fetchData();
    }, [categories])

    return (
       <div>
        <CategoryBar setCategories={setCategories}/>
       {Info && Info.length > 0 ? Info.map((item: any, index: number) => {
           return (
               <div className="w-[60%] ml-72 h-56 mt-10 border-b-2 border-t-2 border-gray-400" key={index}>
                   <Link to={`/blog/viewblog/:${item._id}`}>
                       <div className='h-56 flex  rounded-2xl '>
                           <div className='w-[80%]'>
                               <div className='flex'>
                                   <img src={item?.userImg} className='rounded-full h-12 w-12 mt-6 ml-4' />
                                    <div className="">
                                    <div className='text-black mt-6 text-sm ml-1'>{item?.userName}</div>
                                   <div className='text-black ml-1 text-sm'>{item?.createdAt}</div>
                                    </div>
                               </div>
                               <button className='ml-6 mt-2'>{item?.categories}</button>
                               <div className='ml-6 mt-4 text-lg font-bold font-serif'>
                                   {item.title.slice(0, 40)}...
                               </div>
                               <p className='font-serif w-[75%] ml-6'>
                                   {item.content.slice(0, 170)}...
                               </p>
                           </div>
                           <div className='w-[20%] flex mr-5'>
                               <img className='w-40 h-40 mt-10 mr-5' src={item.imagePath} />
                           </div>       
                       </div>
                   </Link>
               </div>
           )
       }):
       <div className="text-center mt-20 text-4xl font-serif">No blogs available for category {categories}...</div>
    }
   </div>
   
    )
}

const CategoryBar = ({setCategories}:any)=>{
    return(
        <div className="relative  rounded-lg mt-10">
        <ul className="flex flex-wrap justify-center gap-8">
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('politics')} >POLITICS</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('entertaintment')} >ENTERTAINTMENT</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('travel')} >TRAVEL</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('crime')} >CRIME</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('games')} >GAMES</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('fitness')} >FITNESS</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('health')} >HEALTH</button>
            <button className="cursor-pointer transition duration-300 ease-in-out bg-blue-200 hover:bg-blue-700 text-black font-semibold py-2 px-4 rounded-lg" onClick={() => setCategories('all')} >ALL</button>
        </ul>
    </div>
    )
}

export default CardComponent;
