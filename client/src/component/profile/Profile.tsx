import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Home/HomeComponent/Navbar'
import axios from 'axios'

const profile = () => {
    return (
        <div className='h-screen'>
            <Navbar />
            <div className='flex h-[100%]'>
                <div className=' w-[65%]'>
                    <Menu />
                </div>
                <div className=' w-[35%] h-full border-2 border-gray-200 '>
                    <Bio />
                </div>
            </div>
        </div>
    )
}

interface ComponentCard {
    _id: string,
    imagePath: string,
    title: string,
    content: string,
    category: string,
    userName:string,
    userImg:String,
    userId:string,
    createdAt: string,
    updatedAt:string
}

const Menu = () => {

    const [data, setData] = useState<ComponentCard[]>([])


    useEffect((): any => {
        return async () => {
            const url = "http://localhost:8080/api/v1/post/getMyPost";
            const jwt = window.localStorage.getItem('JWT');
            const res = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (res.statusText === "OK") {
                setData(res.data.myBlog);
            }
        }
    }, [])

    return (
        <div>
            <div role="tablist" className="tabs tabs-lifted mt-10 w-[90%] ml-10 overflow-auto">
                <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold" aria-label="Blogs" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6 ">
                    {
                        data?.map((item, index): any => {
                            return <CardComponent key={index} item={item} />
                        })
                    }
                </div>
                <input type="radio" name="my_tabs_2" role="tab" className="tab font-bold" aria-label="About" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    {
                        <div className="bg-gray-100 w-80% mx-auto text-center h-80 mt-10 flex flex-col justify-center items-center">
                        <p className="font-bold block">Tell the world about yourself</p>
                        <p className='font-light w-[50%]'>Here's where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more. You can even add images and use rich text to personalize your bio.</p>
                        <BioDialogBox/>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}


const CardComponent = ({ item}: any) => {

    return (
        <Link to={`/blog/viewblog/:${item._id}`}>
            <div className='w-[100%] h-56 rounded-lg mt-10 flex border-2 border-black box-border shadow-md shadow-slate-500'>
                <div className='w-[100%] '>
                    <div className='flex'>
                        <img src={item.userImg} className='rounded-full h-10 w-10  mt-6 ml-4' />
                        <div>
                          <p className='text-black mt-6 text-sm ml-1'>{item.userName}</p>
                          <p className='text-black  ml-1 text-sm'>.{item.createdAt}</p>
                        </div>
                    </div>
                    <button className='ml-6 mt-1'>{item.category}</button>
                    <div className='ml-6 mt-2 text-lg font-bold font-serif'>
                        {item.title.slice(0, 10)}...
                    </div>
                    <p className='font-serif w-[95%] ml-6 '>
                        {item.content.slice(0, 45)}...
                    </p>
                </div>
                <div className='w-[30%] '>
                    <img className='w-36 h-40 mt-8 mr-6' src={item.imagePath} />
                </div>
            </div>
        </Link>
    )
}



const Bio = () => {

    const [data, setData] = useState<string>('')

    useEffect((): any => {
        return async () => {
            const url = "http://localhost:8080/api/v1/user/info";
            const jwt = window.localStorage.getItem('JWT');
            const res = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            })
            if (res.statusText === "OK") {
                console.log(res);
                setData(res.data.imgPath);
            }
        }
    }, [])

    return (
        <div className='fixed w-96 h-[70%] mt-20 ml-10'>
            <img src={data} className="w-40 h-40 ml-28 mt-10 border-black border-2 border-solid rounded-full" />
            {/* <div className=' mt-3 font-bold text-md text-center'>Name : {data?.user?.name}</div>
            <div className=' mt-3 font-bold text-md text-center'>Qualification : {data?.qualification}</div>
            <div className=' mt-3 font-bold text-md text-center'>Profession : {data?.profession}</div>
            <div className='mt-3 font-bold text-md text-center'>Hobbies : {data?.hobbies}</div>
            <div className='mt-3 font-bold text-md text-center'>Bio : {data?.bio}</div>
             */}
        </div>
    )
}

const BioDialogBox = () => {

    const [qualification, setQualification] = useState("");
    const [bio, setBio] = useState("");
    const [profession, setProfession] = useState("");
    const [hobbies, setHobbies] = useState("");

    const openModal = () => {
        const modal = document.getElementById('my_modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    const submithandler = async () => {
        const url = "http://localhost:8787/api/v1/info/userBio";
        const jwt = window.localStorage.getItem("jwt")
        const res = await axios.post(url,
            {
                qualification,
                profession,
                bio,
                hobbies
            }, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        if (res.statusText === "OK") {
            setBio("")
            setHobbies("")
            setProfession("")
            setQualification("")
        }
    }

    return (
        <>
            <button className="btn  text-green-400 mt-7 font-bold font-serif bg-gray-400" onClick={openModal}>Edit Profile</button>
            <dialog id="my_modal" className="modal">
                <div className="modal-box mr-40">
                    <form onSubmit={submithandler} method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <input onChange={(e: any) => setQualification(e.target.value)} type='text' className='w-full h-10 mt-5 resize-none text-xl font-serif border-2 border-gray-300 rounded-md px-4 py-3' placeholder='Qualification' />
                        <input onChange={(e: any) => setProfession(e.target.value)} type='text' className='w-full h-10 mt-5 resize-none text-xl font-serif border-2 border-gray-300 rounded-md px-4 py-3' placeholder='profession' />
                        <input onChange={(e: any) => setHobbies(e.target.value)} type='text' className='w-full h-10 mt-5 resize-none text-xl font-serif border-2 border-gray-300 rounded-md px-4 py-3' placeholder='Hobbies' />
                        <textarea onChange={(e: any) => setBio(e.target.value)} className="w-full h-40 mt-5 resize-none text-xl font-serif border-2 border-gray-300 rounded-md px-4 py-3" placeholder="Write a breif about your self..."></textarea>
                        <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Save Changes
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}
export default profile;