import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { registerApi } from "../../apiCalls/outerPartApi"
import { Loader } from "../../components/loader"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { toasterData } from "../../components/toastify"

export let RegisterPart = () => {
    let navigate = useNavigate()
    let authState = Boolean(JSON.parse(localStorage.getItem("userDetails")))
    let [loading, setLoading] = useState(false)
    let [registerdetail, setregisterdetails] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
    })
    let datachange = (e) => {
        setregisterdetails({ ...registerdetail, [e.target.name]: e.target.value })
    }
    let registersubmit = async (e) => {
        e.preventDefault()
        if (!registerdetail.name || !registerdetail.email || !registerdetail.password || !registerdetail.confirmpassword) {
            toast.warn("Please fill all the fields", { ...toasterData.warning, transition: Bounce });
            return;
        }
        if (registerdetail.password !== registerdetail.confirmpassword) {
            toast.warn("Passwords do not match", { ...toasterData.warning, transition: Bounce });
            return;
        }
        try {
            delete registerdetail.confirmpassword
            setLoading(true)
            let response = await registerApi(registerdetail)
            setLoading(false)
            toast.success(response.msg, { ...toasterData.success, transition: Bounce });
        } catch (e) {
            toast.error(e.message, { ...toasterData.error, transition: Bounce })
            setLoading(false)
        }
        setregisterdetails({
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
        })
    }
    if (authState) {
        return <Navigate to="/blog/home" />
    }
    return (
        <>
            <div className="h-[100vh] flex items-center justify-center">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6">
                    <h2 className="text-3xl font-semibold text-center text-purple-600">Create Your Account</h2>
                    <p className="text-center text-gray-600">Please fill in the details to register</p>

                    <form onSubmit={registersubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={registerdetail.name}
                                onChange={datachange}
                                required
                                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={registerdetail.email}
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
                                value={registerdetail.password}
                                required
                                onChange={datachange}
                                className="mt-datachange w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                                value={registerdetail.confirmpassword}
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
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <button className="text-purple-600 hover:text-purple-700 cursor-pointer font-semibold" onClick={() => { navigate("/") }}>
                                Log In
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