import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'
import { Routes, Route } from "react-router-dom"
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Service from './pages/Service'
import Footer from './components/Footer'
import Page404 from "./pages/Page404"
import { AuthContext } from './store/auth'
import Logout from "./pages/Logout"
import UserDetail from './pages/UserDetail'
import Protectedroute from './ProtectedRoute/Protectedroute'
import { useContext } from 'react'
import AfterLoginRegister from './pages/AfterLoginRegister'
import { ToastContainer } from 'react-toastify'
import AdminLayout from './components/Layout/Admin-Layout'
import Adminuser from './components/Layout/Admin-user'
import Admincontact from './components/Layout/Admin-Contact'
import AdminService from './components/Layout/Admin-Service'
import AdminProtectedRoute from './ProtectedRoute/AdminProtectedRoute'

function App() {
  const { isLoggin } = useContext(AuthContext)

  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<Protectedroute />}>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/service' element={<Service />} />
          <Route path='/userDetail' element={<UserDetail />} />
          <Route path='/afterloginregister' element={<AfterLoginRegister />} />  {/* waiting stage */}
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/logout' element={<Logout />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='users' element={<Adminuser />} />
            <Route path='contacts' element={<Admincontact />} />
            <Route path='services' element={<AdminService />} />
          </Route>
        </Route>
        <Route path='*' element={<Page404 />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
