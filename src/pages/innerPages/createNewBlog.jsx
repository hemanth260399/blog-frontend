import { useEffect, useState } from "react"
import { createNewBlogApi, editCurrentBlog, getBlogApi } from "../../apiCalls/bloggingApi"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Loader } from "../../components/loader"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { toasterData } from "../../components/toastify"

export let CreateBlog = () => {
    let [params] = useSearchParams()
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()
    let [blog, setBlog] = useState({
        title: "",
        category: "",
        image: "",
        content: ""
    })
    let [edit, setEdit] = useState(false)
    let handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }
    let handleSubmit = async (e) => {
        e.preventDefault()
        if (!blog.title || !blog.category || !blog.content) {
            toast.warn("Please fill all Mentioned fields", { ...toasterData.warning, transition: Bounce });
            return
        }
        if (edit) {
            try {
                setLoading(true)
                let response = await editCurrentBlog({ blogData: blog, id: params.get("id") })
                toast.success(response.msg, { ...toasterData.success, transition: Bounce });
                setEdit(false)
                setBlog({
                    title: "",
                    category: "",
                    image: "",
                    content: ""
                })
                setLoading(false)
                setTimeout(() => {
                    navigate("/blog/userPage")
                }, 2000)
            } catch (err) {
                toast.error(err.message, { ...toasterData.error, transition: Bounce })
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                let response = await createNewBlogApi({ blogData: blog })
                setBlog({
                    title: "",
                    category: "",
                    image: "",
                    content: ""
                })
                setLoading(false)
                toast.success(response.msg, { ...toasterData.success, transition: Bounce });
            } catch (err) {
                setLoading(false)
                toast.error(err.message, { ...toasterData.error, transition: Bounce })
            }
        }
    }
    let imageSubmit = (e) => {
        let image = e.target.files[0]
        if (!image.type.startsWith('image/')) {
            toast.warn("Please select image file", { ...toasterData.warning, transition: Bounce });
            setBlog({ ...blog, image: "" })
            e.target.value = ""
        }
        let reader = new FileReader()
        reader.onloadend = () => {
            setBlog({ ...blog, image: reader.result })
        }
        reader.readAsDataURL(image)
    }
    useEffect(() => {
        if (params.get("id")) {
            let blogeditData = async () => {
                try {
                    let response = await getBlogApi(params.get("id"))
                    setBlog({
                        title: response.data.title,
                        category: response.data.category,
                        content: response.data.content
                    })
                    setEdit(true)
                } catch (err) {
                    toast.error(err.message, { ...toasterData.error, transition: Bounce })
                }
            }
            blogeditData()
        }
    }, [params])
    return (
        <>
            <div>
                <h1 className="text-4xl font-bold mt-5 text-blue-400 text-center">POST A NEW BLOG</h1>
            </div>
            <form className="max-w-[120vh] mx-auto mt-5 bg-blue-200 rounded-xl p-5">
                <div className="mb-5">
                    <label htmlFor="base-input" className="block mb-2 text-xl font-extrabold font-large text-blue-400 dark:text-white">Title <span className="text-red-500">*</span></label>
                    <input type="text" id="base-input" value={blog.title} onChange={handleChange} name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="mb-5">
                    <label htmlFor="countries" className="block mb-2 text-xl font-extrabold font-large text-blue-400 dark:text-white">Select category <span className="text-red-500">*</span></label>
                    <select id="countries" onChange={handleChange} value={blog.category} name="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>Select category</option>
                        <option>Career</option>
                        <option>Finance</option>
                        <option>Travel</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="base-input" className="block mb-2 text-xl font-extrabold font-large text-blue-400 dark:text-white">Content <span className="text-red-500">*</span></label>
                    <input type="text" id="base-input" value={blog.content} name="content" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="mb-5 ">
                    <label className="block mb-2 text-xl font-extrabold font-large text-blue-400 dark:text-white" htmlFor="user_avatar">Upload file</label>
                    <input className="block h-[50px] w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" name="image" onChange={imageSubmit} aria-describedby="user_avatar_help" id="user_avatar" type="file" />
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="user_avatar_help">Upload the picture of the blog here</div>
                </div>
                <button className="relative inline-flex items-center text-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                    <span className="relative font-bold px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent" onClick={handleSubmit}>
                        {edit ? "EDIT" : "POST"}
                    </span>
                </button>
            </form>
            <ToastContainer />
            {loading && <Loader />}
        </>
    )
}