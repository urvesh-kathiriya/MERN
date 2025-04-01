import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):'')
  const [isLoggin, setIsLoggin] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [data, setData] = useState(null);
  const apiurl = import.meta.env.VITE_API_URL


  const storetokenINLS = (token) => {
    return localStorage.setItem('token', token);
  }

  const LogoutUser = () => {
    setToken("")
    return localStorage.removeItem("token")
  }
  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      setIsLoggin(true)
    }
    else {
      setIsLoggin(false)
    }
  }
    , [storetokenINLS, LogoutUser, isLoggin])

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }

    try {
      const decodedToken = jwtDecode(token);
      const now = Math.floor(Date.now() / 1000);

      return decodedToken.exp < now;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const isExpired = isTokenExpired(token);
      setIsExpired(isExpired);
      if (!token || isExpired) {
        location.pathname === "/" ? null : navigate('/login');
        return localStorage.removeItem("token")

      }

      try {
        const response = await axios.get(`${apiurl}/api/users/data`, {
          headers: {
            authToken: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.log("Error Response:", error);
      }
    };

    fetchData();
  }, [isLoggin, isExpired]);


  return (
    <AuthContext.Provider value={{ storetokenINLS, LogoutUser, isLoggin, data, isExpired, token }}>
      {children}
    </AuthContext.Provider>
  )
}