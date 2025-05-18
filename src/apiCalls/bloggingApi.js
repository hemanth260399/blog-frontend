import axios from "axios"
let url = import.meta.env.VITE_BE_URL
export let createNewBlogApi = async (blogData) => {
    try {
        let response = await axios.post(`${url}/blog`, blogData, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let AllBlogApi = async () => {
    try {
        let response = await axios.get(`${url}/blog`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let individualBlogApi = async (id) => {
    try {
        let response = await axios.get(`${url}/blog/individualblog?user=${id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let DeleteBlogApi = async (id) => {
    try {
        let response = await axios.delete(`${url}/blog?id=${id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let getBlogApi = async (id) => {
    try {
        let response = await axios.get(`${url}/blog/editBlog?id=${id}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let editCurrentBlog = async (data) => {
    try {
        let response = await axios.patch(`${url}/blog?id=${data.id}`, data.blogData, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}
export let filterBlogApi = async (data) => {
    try {
        let response = await axios.get(`${url}/blog/filter?category=${data.filter.category ? data.filter.category : ""}&author=${data.filter.author ? data.filter.author : ""}`, {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        return response.data
    } catch (e) {
        throw new Error(e.response.data.msg)
    }
}