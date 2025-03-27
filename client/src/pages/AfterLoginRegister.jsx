import React, { useEffect, useState } from 'react';
import logo from "/logo.png"

import { useLocation, useNavigate } from 'react-router-dom';

const AfterLoginRegister = () => {
  const location = useLocation()
  const [path, setPath] = useState()
  useEffect(() => {
    if (location.state.path) {
      setPath(location.state.path)
    }
  }, [location])
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen text-center">

        <h1 className="text-8xl font-bold text-red-600">403</h1>


        <p className="text-xl text-gray-700 mt-2">
          You tried to access <span className="font-semibold text-black">{path}</span>, but you are also loggin so,not authorized to access this page.
        </p>


        <div className='grid grid-cols-2'>
          <img src={logo} alt="Not Found" className="w-40 h-40 mt-5" />
          <p className='text-5xl tracking-widest font-bold font-serif flex justify-center items-center'>MERN</p>
        </div>


      </div>

    </div>
  )
};

export default AfterLoginRegister;