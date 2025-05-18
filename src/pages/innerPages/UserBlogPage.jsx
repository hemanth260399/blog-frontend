import { useEffect, useState } from "react"
import { BlogCard } from "../../components/cardComponent"
import { DeleteBlogApi, individualBlogApi } from "../../apiCalls/bloggingApi"
import { useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { Loader } from "../../components/loader"
import { toasterData } from "../../components/toastify"

export let UserBlog = () => {
    let [blogData, setBlogData] = useState([])
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let userData = JSON.parse(localStorage.getItem("userDetails"))
    useEffect(() => {
        let myBlogs = async () => {
            try {
                setLoading(true)
                let response = await individualBlogApi(userData.id)
                setLoading(false)
                setBlogData(response.data)
            } catch (err) {
                setLoading(false)
                toast.error(err.message, { ...toasterData.error, transition: Bounce })
            }
        }
        myBlogs()
    }, [])
    let deleteBlog = async (id) => {
        try {
            setLoading(true)
            let response = await DeleteBlogApi(id)
            setLoading(false)
            toast.success(response.msg, { ...toasterData.success, transition: Bounce });
            setBlogData(response.data)
        } catch (err) {
            setLoading(false)
            toast.error(err.message, { ...toasterData.error, transition: Bounce })
        }
    }
    let editBlog = async (id) => {
        navigate(`/blog/createBlog?id=${id}`)
    }
    return (
        <>
            <h5 className="text-center text-4xl mt-4   font-bold">My Blog Posts</h5>
            <div className="flex flex-wrap justify-center">
                {blogData.length > 0 ? blogData.map((item, index) => {
                    return (
                        <>
                            <BlogCard item={item} key={index} />
                            <div className="mt-3 mx-100 text-center">
                                <button type="button" onClick={() => editBlog(item._id)} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">EDIT</button>
                                <button type="button" onClick={() => deleteBlog(item._id)} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">DELETE</button>
                            </div>
                        </>
                    )
                }) : <h1 className="text-center text-4xl mt-20 text-white bg-blue-400 p-2 rounded flex item-center font-bold">No blog Posted</h1>}
            </div>
            <ToastContainer />
            {loading && <Loader />}
        </>
    )
}