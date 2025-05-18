import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"

export let TopNavBar = () => {
    let navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    let logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <nav className=" border-gray-200 sticky top-0 left-0 w-full z-[99]  bg-gray-300">
                <div className="max-w-screen-xl flex flex-wrap  items-center justify-between  mx-auto p-3">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfBUccyWU6Rxm4KuwHx8wwGdeLBA0LM3WrpQ&s" className="h-8" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BLOG APPLICATION</span>
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto `} id="navbar-default">
                        <ul className="font-medium flex text-xl flex-col  mt-1 rounded-lg md:flex-row md:space-x-8 ">
                            <li><button className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 transition duration-500" onClick={() => navigate("/blog/home")}>Home</button></li>
                            <li><button className="block py-2 px-3 text-gray-900 p-5 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0   md:hover:text-blue-700  transition duration-500" onClick={() => navigate("/blog/userPage")}>My Blogs</button></li>
                            <li><button className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  transition duration-500" onClick={() => navigate("/blog/createBlog")}>Create New Blog</button></li>
                            <button className="px-3 rounded-lg bg-blue-800 text-white md:hover:text-blue-700 md:hover:bg-inherit transition duration-800 " onClick={logout}>Logout</button>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}