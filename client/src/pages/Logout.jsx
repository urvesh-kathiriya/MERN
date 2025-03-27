import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../store/auth"

const LogOut = () => {
  const navigate = useNavigate()
  const {LogoutUser} = useContext(AuthContext)
  useEffect(() => {
    LogoutUser();
    navigate("/login");
  }, [LogoutUser, navigate]);

  return null;
}

export default LogOut


