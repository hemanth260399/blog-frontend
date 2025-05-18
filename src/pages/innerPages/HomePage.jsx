import { useEffect, useState } from "react"
import { AllBlogApi, filterBlogApi } from "../../apiCalls/bloggingApi"
import { BlogCard } from "../../components/cardComponent"
import { Loader } from "../../components/loader"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { toasterData } from "../../components/toastify"
export let HomePage = () => {
    let [blogData, setBlogdata] = useState([])
    let [loading, setLoading] = useState(false)
    let [filter, setFilter] = useState({ category: "", author: "" })
    useEffect(() => {
        let getdata = async () => {
            try {
                setLoading(true)
                let response = await AllBlogApi()
                setBlogdata(response.data)
                setLoading(false)
            } catch (err) {
                toast.error(err.message, { ...toasterData.error, transition: Bounce })
                setLoading(false)
            }
        }
        getdata()
    }, [])
    let handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }
    let handleFilter = async (e) => {
        e.preventDefault()
        try {
            let response = await filterBlogApi({ filter })
            setBlogdata(response.data)
        } catch (err) {
            toast.error(err.message, { ...toasterData.error, transition: Bounce })
            setLoading(false)
        }
    }
    return (
        <>
            <div className="relative max-w-[100%] mx-auto">
                <img className="h-100 w-full object-cover rounded-md" src="https://images.unsplash.com/photo-1680725779155-456faadefa26" alt="Random image" />
                <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-white text-3xl font-bold">WELCOME TO MY BLOG APPLICATION</h2>
                </div>
            </div>
            <div className="flex flex-wrap justify-center mt-15 ">
                <div className="mx-5">
                    <label htmlFor="category" className="block mb-2 text-xl font-extrabold font-large text-blue-600 dark:text-white">Select category</label>
                    <select id="category" name="category" onChange={handleChange} className="bg-gray-50 border-2 border-blue-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option></option>
                        <option>Career</option>
                        <option>Finance</option>
                        <option>Travel</option>
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="base-input" className="block mb-2 text-xl font-extrabold font-large text-blue-600 dark:text-white">Author Name</label>
                    <input type="text" id="base-input" name="author" onChange={handleChange} placeholder="Enter Author Name" className="bg-gray-50 border-2 border-blue-900 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
            </div>
            <div className="flex justify-center">
                <button type="button" onClick={handleFilter} className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Apply Filter</button>
            </div>
            <div className="flex flex-wrap justify-center">
                {
                    blogData.length > 0 && blogData.map((item, index) => {
                        return (
                            <BlogCard key={index} item={item} />
                        )
                    })
                }
            </div >
            {loading && <Loader />}
            <ToastContainer />
        </>
    )
}