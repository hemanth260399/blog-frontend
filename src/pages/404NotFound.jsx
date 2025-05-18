import { useNavigate } from "react-router-dom"

export let NotFound = () => {
    let navigate = useNavigate()
    return (
        <>
            <div className="flex justify-center items-center mt-20 ">
                <div className="max-w-md p-6 bg-inherit text-center  border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div>
                        <i className="fa-regular fa-face-sad-tear text-8xl text-red-500"></i>
                    </div>
                    <div className="mt-5">
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-red-500 dark:text-white">404 ERROR</h5>
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-red-500 dark:text-white">PAGE NOT FOUND</h5>
                    </div>
                    <p className="mb-3 mt-5 text-xl font-bold">Please check the URL to find the page</p>
                    <button type="button" onClick={() => { navigate("/blog/home") }} className="text-white mt-5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Home</button>
                </div>
            </div>
        </>
    )
}