import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Pencil } from "lucide-react";
import cover from "../assets/images/cover.png"
import { AuthContext } from '../store/auth';
import { useState } from 'react';
import { useEffect } from 'react';


const UserDetails = () => {
  const { data } = useContext(AuthContext)
  const [username, setUsername] = useState()
  const [phone, setPhone] = useState()
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(null);
  useEffect(() => {
    if (data) {
      setUsername(data.User_name),
        setPhone(data.Number)
    }
  }, [data])



  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFilePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-3 shadow-[#9A6CC9]  mb-10 ">
      <div className="relative bg-gray-300 h-64 flex items-center justify-around">
        <img src={filePreview?filePreview:cover} alt="" className="h-64 w-full" />
        <div className="flex flex-col items-center">
          <label className="absolute top-4 right-4 bg-yellow-500 text-white  px-4 py-2 rounded w-64  cursor-pointer">
          Enhance cover image
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .svg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col p-8 relative">
        <div className="w-32 h-32 border-4 bg-gray-800 border-white  rounded-full overflow-hidden absolute -mt-16">
          <div className='w-full h-full object-cover text-6xl text-amber-600 flex justify-center items-center'>
            {username ? username.charAt(0).toUpperCase() : "?"}
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-16">{username}</h2>
        <p className="text-gray-600 text-lg">{phone ? phone : "f"}</p>
        <p className="text-md text-gray-500">Ahmedabad, Gujarat, India &middot; <button onClick={() => navigate("/contact")} className="text-blue-500" >Contact info</button></p>

        <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full text-lg flex justify-center items-center">
          <span className="mr-2"><Pencil /></span> Edit the Profile
        </button>
      </div>

    </div>

  )
}

export default UserDetails
