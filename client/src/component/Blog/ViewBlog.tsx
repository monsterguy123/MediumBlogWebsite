import { useState, useEffect } from 'react';
import Navbar from '../Home/HomeComponent/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Data {
    title: string;
    imagePath: string;
    content: string;
    category: string;
    createdAt: string;
    userName: string;
    userImg: string;
    userId:string
}

const ViewBlog = () => {
    const [data, setData] = useState<Data | null>(null);
    const [date, setDate] = useState<string>("");
    const [commentCount, setCommentCount] = useState<number>(0);
    const { blogid } = useParams<{ blogid: string }>();
    const id = blogid?.split(':')[1];
    const Id = localStorage.getItem('userId');
   console.log(Id)
   console.log(data?.userId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/v1/post/${id}`;
                const jwt = window.localStorage.getItem('JWT');
                const res = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                if (res.status === 200) {
                    setData(res.data.data);
                    const dateString = res.data.data.createdAt;
                    const date = new Date(dateString);
                    const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
                    const formattedDate = date.toLocaleDateString('en-US', options);
                    setDate(formattedDate);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="h-screen">
            <Navbar />
            {data ? (
                <div className="w-[70%] border-b-2 border-black ml-48 mt-5">
                    <div className="w-[70%] font-bold font-serif text-4xl ml-20 mt-10">{data.title}</div>
                    {
                        (Id === data.userId)?<div className='flex justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                        </div>:null
                    }
                    <div className="flex">
                        <img src={data.userImg} className="border-2 border-black w-10 h-10 rounded-full ml-20 mt-4" alt="User Avatar" />
                        <div className="flex">
                            <p className="text-sm font-thin ml-3 mt-5 w-24">{data.userName}</p>
                            <p className="text-sm font-serif  mt-5 w-24">{date}</p>
                        </div>
                        <div className="drawer drawer-end mt-4 ml-2">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer-4" className="drawer-button ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                    <p className='text-sm font-light ml-2'>{commentCount}</p>
                                </label>
                            </div>
                            <CommentSection postId={id!} setCommentCount={setCommentCount} />
                        </div>
                    </div>
                    <img className="w-[80%] h-96 mt-10 ml-20" src={data.imagePath} alt="Blog Header" />
                    <div className="w-[80%] h-[100%] mt-10 ml-20 mb-10 font-thin text-lg">{data.content}</div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


interface Comment {
    _id: string,
    comment: string,
    createdAt: string,
    userImg: string,
    postId: string,
    updatedAt: string,
    userId: string,
    user: string
}
const CommentSection = ({ postId, setCommentCount }: { postId: string, setCommentCount: React.Dispatch<React.SetStateAction<number>> }) => {

    const [comment, setComment] = useState<string>("")
    const [CC, setCC] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>([])


    let submitHandler;
    let deleteComment;

    // Send Comment
    submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = "http://localhost:8080/api/v1/comment/createComment";
        const jwt = localStorage.getItem("JWT");
        const body = {
            comment,
            postId
        }
        try {
            const res = await axios.post(url, body, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            });

            if (res.status === 200) {
                setCC(!CC);
                setComment("");
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    // Delete Comment
    deleteComment = async (commentId: string) => {
        const url = `http://localhost:8080/api/v1/comment/deleteComment/${postId}/${commentId}`;
        const jwt = localStorage.getItem("JWT");
        try {
            await axios.delete(url, {
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            });
            setCommentCount(prevCount => prevCount - 1);
            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };


    // useEffect to fetch comments from Database
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `http://localhost:8080/api/v1/comment/${postId}/getallcomment`;
                const jwt = localStorage.getItem("JWT");
                const res = await axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${jwt}`
                    }
                });
                if (res.status === 200) {
                    setComments(res.data.Comments);
                    setCommentCount(res.data.Comments.length);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchData();
    }, [postId, setCommentCount, setComment, CC]);



    return (
        <div className="drawer-side overflow-auto">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content overflow-auto">
                <div className='text-center text-xl underline font-serif font-bold '>COMMENT SECTION</div>
                {comments && comments.map((item, index) => (
                    <div key={index} className="chat chat-end mr-2 mt-3">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Author Avatar" src={item.userImg} />
                            </div>
                        </div>
                        <footer className="chat-header w-48 flex">
                            {item.user}
                            <time className="text-xs opacity-50">{item.createdAt}</time>
                            <button onClick={() => deleteComment(item._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </footer>
                        <div className="chat-bubble bg-white text-black w-56">{item.comment}</div>
                    </div>
                ))}
            </ul>
            <form onSubmit={submitHandler} className='flex fixed bottom-1 px-4 w-80 mr-2'>
                <input onChange={(e) => setComment(e.target.value)} value={comment} className="w-full border rounded px-3 py-2" placeholder='Share your thoughts' />
                <button type='submit' className='ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ViewBlog;
