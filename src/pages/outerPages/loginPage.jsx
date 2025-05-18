import { useState } from "react"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { Navigate, useNavigate } from "react-router-dom"
import { loginApi } from "../../apiCalls/outerPartApi"
import { Loader } from "../../components/loader"
import { toasterData } from "../../components/toastify";

export let LoginPart = () => {
    let [logindetail, setlogindetail] = useState({ email: "", password: "" })
    let [loading, setLoading] = useState(false)
    let authState = Boolean(JSON.parse(localStorage.getItem("userDetails")))
    let navigate = useNavigate()
    let datachange = (e) => {
        setlogindetail({ ...logindetail, [e.target.name]: e.target.value })
    }
    let loginsubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let response = await loginApi(logindetail)
            localStorage.setItem("token", response.token)
            localStorage.setItem("userDetails", JSON.stringify(response.userDetails))
            setLoading(false)
            navigate("/blog/home")
        } catch (e) {
            console.log(e)
            toast.error(e.message, { ...toasterData.error, transition: Bounce })
            setLoading(false)
        }
    }
    if (authState) {
        return <Navigate to="/blog/home" />
    }
    return (
        <>
            <div className=" flex items-center justify-center h-[100vh]">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6 border border-purple-600">
                    <h2 className="text-3xl font-semibold text-center text-purple-600">
                        Welcome Back
                    </h2>
                    <p className="text-center text-gray-600">Please log in to your account</p>

                    <form onSubmit={(e) => { loginsubmit(e, logindetail) }} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={logindetail.email}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={logindetail.password}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    <div className="text-center">
                        <button className="text-purple-600 hover:text-purple-700 font-semibold mb-5" onClick={() => { navigate("/forgetpassword") }}>
                            Forget Password
                        </button>
                        <p className="text-sm text-gray-500">
                            Don't have an account?{' '}
                            <button className="text-purple-600 hover:text-purple-700 font-semibold" onClick={() => { navigate("/register") }}>
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {loading && <Loader />}
        </>
    )
}