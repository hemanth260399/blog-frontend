import axios from "axios"
let url = import.meta.env.VITE_BE_URL
//Registering the new user API CALL
export let registerApi = async (userData) => {
    try {
        let response = await axios.post(`${url}/auth/signup`, userData)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
//Signing in API call
export let loginApi = async (userData) => {
    try {
        let response = await axios.post(`${url}/auth/login`, userData)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
//API call for forget password
export let forgetPasswordapi = async (userData) => {
    try {
        let response = await axios.post(`${url}/auth/forgetpassword`, userData)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
//API call for change password
export let changepasswordapi = async (token, user) => {
    try {
        let response = await axios.post(`${url}/auth/changepassword?token=${token}`, user)
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}