import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from '../assets/images/register.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Register = () => {
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_URL
  const [email, setemail] = useState(false)

  const [user, setUser] = useState({
    User_name: '',
    Email: '',
    Password: '',
    Number: ''
  });

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      return console.log("email exits")
    }
    try {
      const response = await axios.post(`${apiUrl}/api/users/register`, user)
      console.log(response)
      if (response.status === 201) {
        toast.success('Register successfully !', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/login",{state:user.Email})
      }

    } catch (error) {
      console.log(error)
    }
  };


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/users/`);
        
        const userExists = res.data.some(data => user.Email === data.Email);

        if (userExists) {
          setemail(true);
        }
        else{
          setemail(false)
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
}, [user.Email]); 



  return (
    <div className='p-12'>
      <div className="flex flex-col md:flex-row border-t-4 border-b-4 rounded-4xl py-8 gap-12 justify-center items-center">
        <div>
          <img src={image} alt="Register" className="w-[450px] h-[450px]" />
        </div>
        <div>
          <h1 className="relative font-bold flex justify-start items-center p-4 text-3xl tracking-widest font-mono">
            <span className="relative after:absolute after:left-0.5 after:bottom-[-5px] after:h-[4px] after:w-[195px] after:bg-blue-800 after:rounded-full after:content-['']">
              Register Form!
            </span>
          </h1>
          <form className="bg-gray-200 p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>

            <label htmlFor="User_name" className="block mb-2">Username</label>
            <input
              type="text"
              id='User_name'
              name="User_name"
              autoComplete="username"
              className="w-full p-2 border border-gray-600 rounded mb-4"
              value={user.User_name}
              onChange={handleUser}
              placeholder="Enter username"
              pattern='^[A-Za-z]+$'
              title='Username must contain only letters.'
              required
            />

            <label htmlFor="Email" className="block mb-2">Email</label>
            <input
              type="email"
              id='Email'
              name="Email"
              autoComplete="email"
              className="w-full p-2 border border-gray-600 rounded "
              value={user.Email}
              onChange={handleUser}
              placeholder="Enter email"
              pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
              title='Please enter a valid email address.'
              required
            />
            {email && (
              <div className="text-red-500 ">
                Email already exists
              </div>
            )}

            <label htmlFor="Number" className="block mb-2 mt-4">Phone Number</label>
            <input
              type="tel"
              id='Number'
              name="Number"
              autoComplete="tel"
              className="w-full p-2 border border-gray-600 rounded mb-4"
              value={user.Number}
              onChange={handleUser}
              placeholder="Enter phone number"
              required
              pattern='[0-9]{10}'
              title='Phone number must be 10 digits long.'
            />

            <label htmlFor="Password" className="block mb-2">Password</label>
            <input
              type="password"
              id='Password'
              name="Password"
              autoComplete="new-password"
              className="w-full p-2 border border-gray-600 rounded mb-4"
              value={user.Password}
              onChange={handleUser}
              placeholder="Enter password"
              required
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              title='Password must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter.'
            />

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              Submit
            </button>

            

          </form>

        </div>
      </div>
    </div>
    
  );
};

export default Register;
