import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/auth";

export default function  Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState()
  const [path, setPath] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { data, isExpired, isLoggin } = useContext(AuthContext)


  const reDirect = (path) => {
    navigate(path)
  }

  const span = () => {
    return <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>

  }
  const active = (path) => {
    return location.pathname === path
      ? "relative block md:inline text-amber-500 group"
      : "relative block md:inline hover:text-gray-300 group";
  }


  useEffect(() => {
    if (data) {
      setUser(data.User_name)
      setIsAdmin(data.isAdmin)
    } else {
      setUser("")
    }
  }
    , [data])

  useEffect(() => {
    if (location.pathname === "/userDetail") {
      setPath(true)
    } else {
      setPath(false)
    }
  },[path])


  return (
    <nav className="bg-gray-900 text-white p-8 flex justify-between items-center shadow-lg ">
      <div className="text-2xl font-bold ml-10 tracking-[0.5em] cursor-pointer" onClick={() => reDirect("/")}>MERN</div>
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </button>
      <div className={`md:flex grid grid-cols-2 justify-center space-x-6 ${isOpen ? "block" : "hidden"} absolute md:static top-16 left-0 w-full md:w-auto bg-gray-900 md:bg-transparent p-4 md:p-2 gap-2 mr-5 `}>
        {isAdmin && isLoggin &&
        <button className={active("/admin")} onClick={() => reDirect("/admin")}>Admin {span()}</button>

        }
        <button className={active("/")} onClick={() => reDirect("/")}>Home {span()}</button>
        <button className={active("/about")} onClick={() => reDirect("/about")}>About {span()}</button>
        <button className={active("/service")} onClick={() => reDirect("/service")}>Service {span()}</button>
        <button className={active("/contact")} onClick={() => reDirect("/contact")}>Contact {span()}</button>
        {isLoggin && !isExpired ?
          (

            <button className={active("/logout")} onClick={() => reDirect("/logout")}>LogOut {span()}</button>
          ) :
          <>
            <button className={active("/login")} onClick={() => reDirect("/login")}>Login {span()}</button>
            <button className={active("/register")} onClick={() => reDirect("/register")}>Register {span()}</button>
          </>
        }

  {isLoggin && !path && !isExpired &&

          <button className="flex justify-start items-center gap-3 border-2  rounded-l-3xl bg-amber-300" onClick={() => { reDirect("/userDetail") }}>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-400 text-gray-600 font-bold text-lg" >
              {user ? user.charAt(0).toUpperCase() : "?"}
            </div>
            <p className="mr-2 text-xl md:text-lg tracking-wider">{user}</p>
          </button>

        }

      </div>

    </nav>
  );
}
