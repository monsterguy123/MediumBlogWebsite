import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const CreateBlog = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [categories, setCategories] = useState<string>('')
    const [img, setImg] = useState<File | null>(null)
    const navigate = useNavigate()

    const submitHandler = async (e: any) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('file', img || '')
        formData.append('title', title)
        formData.append('content', content)
        const cate = categories.toLocaleLowerCase()
        formData.append('category', cate)

        try {
            const jwt = window.localStorage.getItem('JWT')
            const url = 'http://localhost:8080/api/v1/post/createPost'

            const res = await axios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            if (res.status === 200) {
                setTitle('')
                setContent('')
                setCategories('')
                setImg(null) 
                navigate('/profile')
            }
        } catch (error) {
            console.error('Error submitting blog post:', error)
            // Handle error and provide feedback to the user
        }
    }

    return (
        <div className="h-screen">
            <CreateNavbar submitHandler={submitHandler} />
            <div className="w-[70%] mx-auto mt-3">
                <div className="text-md font-bold font-serif mb-2">UPLOAD AN IMAGE FOR YOUR BLOG</div>
                <input
                    onChange={(e) => setImg(e.target.files![0])}
                    className="w-full text-sm font-bold font-serif border-2 border-gray-300 rounded-md px-4 py-3 mb-6"
                    type="file"
                    placeholder="Upload your file..."
                />
                <input
                    onChange={(e) => setCategories(e.target.value)}
                    className="w-full text-md font-bold font-serif border-2 border-gray-300 rounded-md px-4 py-3 mb-6"
                    placeholder="Create Category..."
                />
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full text-3xl font-bold font-serif border-2 border-gray-300 rounded-md px-4 py-3 mb-6"
                    placeholder="Title"
                />
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className="w-full h-96 resize-none text-xl font-serif border-2 border-gray-300 rounded-md px-4 py-3"
                    placeholder="Tell me your story..."
                />
            </div>
        </div>
    )
}

const CreateNavbar = ({ submitHandler }: any) => {
    return (
        <form onSubmit={submitHandler} className="flex w-[80%] h-14 border-black border-solid border-2 ml-36 mt-4">
            <Link to={'/'}>
                <img className="w-14 h-14" src="https://cdn.icon-icons.com/icons2/3041/PNG/512/medium_logo_icon_189223.png" />
            </Link>
            <p className="mt-3 text-sm">Author writing Deepakbisht</p>
            <div className="ml-auto mr-10  flex p-2">
                <button type="submit" className="bg-green-300 w-40 h-8 rounded-lg">
                    Publish
                </button>
                <img src="sdfsd.jpg" className="w-10 h-10 ml-10 border-black border-2 border-solid rounded-full" alt="User Profile" />
            </div>
        </form>
    )
}

export default CreateBlog
