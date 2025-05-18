import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPart } from './pages/outerPages/loginPage'
import { RegisterPart } from './pages/outerPages/registerPage'
import { HomePage } from './pages/innerPages/HomePage'
import { UserBlog } from './pages/innerPages/UserBlogPage'
import { TopNavBar } from './pages/innerPages/TopNavPart'
import { CreateBlog } from './pages/innerPages/createNewBlog'
import { NotFound } from './pages/404NotFound'
import { ForgetPassword } from './pages/outerPages/forgetPassword'
import { ChangePassword } from './pages/outerPages/changePassword'
function App() {
  let PrivateRouter = ({ component }) => {
    let isAutenticated = Boolean(JSON.parse(localStorage.getItem("userDetails")))
    if (isAutenticated) {
      return component
    } else {
      return <Navigate to={"/"} />
    }
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPart />} />
          <Route path="/register" element={<RegisterPart />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route element={<TopNavBar />}>
            <Route path="/blog/home" element={<PrivateRouter component={<HomePage />} />} />
            <Route path="/blog/userPage" element={<PrivateRouter component={<UserBlog />} />} />
            <Route path="/blog/createBlog" element={<PrivateRouter component={<CreateBlog />} />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
