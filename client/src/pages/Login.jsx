import React, { useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from '../assets/images/login.png';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../store/auth';

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const apiUrl = import.meta.env.VITE_API_URL
  const { storetokenINLS, isLoggin } = useContext(AuthContext)
  const [user, setUser] = useState({
    Email: '',
    Password: '',
  });
  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (location.state) {
      setUser((prev) => ({ ...prev, Email: location.state }))
    }
  }, [location.state])


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/api/users/login`, user);
      if (res.status === 200) {
        toast.success('Login successfully !', {
          position: "bottom-center",
          autoClose: 5000,
          theme: "dark",
        });
        await storetokenINLS(res.data.token)
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      if (error.response) {

        if (error.response.status === 400) {
          alert('Invalid email or password');
        } else {
          alert('Something went wrong. Please try again.');
        }
      } else {
        console.log("Error:", error);
      }
    }
  };

  return (
    <div className='p-17.5'>
      <div className="flex flex-col md:flex-row border-t-4 border-b-4 rounded-4xl py-8 gap-12 justify-center items-center">
        <div className=''>
          <img src={image} alt="Login" className="w-[525px] h-[450px] rounded-3xl" />
        </div>
        <div>

          <h1 className="relative font-bold flex justify-start items-center p-4 text-3xl tracking-widest font-mono">
            <span className="relative after:absolute after:left-0.5 after:bottom-[-5px] after:h-[4px] after:w-[145px] after:bg-blue-800 after:rounded-full after:content-['']">
              Login Form!
            </span>
          </h1>

          <form className="bg-gray-200 p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>

            <label className="block mb-2">Email</label>
            <input type="email" name="Email" className="w-full p-2 border border-gray-600 rounded mb-4" autoComplete='email' value={user.Email} onChange={handleUser} placeholder="Enter email" required />

            <label className="block mb-2">Password</label>
            <input type="password" name="Password" autoComplete="current-password" className="w-full p-2 border border-gray-600 rounded mb-4" value={user.Password} onChange={handleUser} placeholder="Enter password" required />

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

