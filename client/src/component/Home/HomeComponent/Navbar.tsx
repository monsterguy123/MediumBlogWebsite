import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {

       const [img,setImg] = useState("")

       useEffect(():any=>{
              const fetch =  async ()=>{
                   const url = "http://localhost:8080/api/v1/user/info";
                   const jwt = localStorage.getItem('JWT');
                   const res = await axios.get(url,{
                      headers:{
                            "Authorization":`Bearer ${jwt}`
                      }
                   })
                   console.log(res.data.imgPath);
                   if(res.statusText === "OK"){
                        setImg(res.data.imgPath);
                   }
              }
              fetch();
       },[])

       return (
              <div className="flex w-full h-14 border-gray-300 border-solid border-2">
                     <Link  to={'/'}><img className='w-14 h-14' src="https://cdn.icon-icons.com/icons2/3041/PNG/512/medium_logo_icon_189223.png" /></Link>
                      <p className='text-lg font-extrabold font-serif mt-3 ml-3'>MEDIUM</p>
                     <div className="flex ml-auto mr-10 space-x-4">
                            <Link to={'/blog/createblog'}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-3 ml-3">
                                   <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                   <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg></Link>
                            <p className="mt-3 mr-3">Write</p>
                            <div className="dropdown dropdown-hover">
                                   <div tabIndex={0} role="button" className=" m-1"><img src={img} className="w-10 h-10 mt-1 mr-10 border-black border-2 border-solid rounded-full" /></div>
                                   <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30">
                                          <li><Link to={'/profile'}>Profile</Link></li>
                                          <li><Link to={'/signin'}>Logout</Link></li>
                                   </ul>
                            </div>
                     </div>
              </div>
       );
};

export default Navbar;