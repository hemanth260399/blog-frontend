import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { toasterData } from "../../components/toastify"
import { forgetPasswordapi } from "../../apiCalls/outerPartApi"
import { Loader } from "../../components/loader"

export let ForgetPassword = () => {
    let [userdata, setuserdata] = useState({ email: "" })
    let [loading, setloading] = useState(false)
    let navigate = useNavigate()
    let authState = Boolean(JSON.parse(localStorage.getItem("userDetails")))
    let datachange = (e) => {
        setuserdata({ ...userdata, [e.target.name]: e.target.value })
    }
    let emailsubmit = async (e) => {
        e.preventDefault()
        if (!userdata.email) {
            toast.warn("Please enter a valid email", { ...toasterData.warning, transition: Bounce });
            return
        }
        try {
            setloading(true)
            let response = await forgetPasswordapi({ email: userdata.email })
            toast.success(response.msg, { ...toasterData.success, transition: Bounce });
            setloading(false)
        } catch (e) {
            setloading(false)
            toast.error(e.message, { ...toasterData.error, transition: Bounce })
        }
    }
    if (authState) {
        return <Navigate to="/blog/home" />
    }
    return (
        <>
            <div className="h-screen  flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <h2 className="text-3xl font-semibold text-center text-purple-600">
                        Forget Password
                    </h2>

                    <form onSubmit={emailsubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userdata.email}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <button className="w-full text-white bg-purple-600 p-3 rounded-lg hover:text-white font-semibold">
                            Send Mail
                        </button>
                    </form>
                    <div className="text-center flex justify-evenly">
                        <button className="text-purple-600 p-3 cursor-pointer underline underline-offset-2 rounded-lg hover:text-purple-700 hover:font-bold font-semibold" onClick={() => { navigate("/") }}>
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
            {loading && <Loader />}
            <ToastContainer />
        </>
    )
}