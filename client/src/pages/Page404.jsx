import React, { useEffect, useState } from 'react'
import logo from "/logo.png"
import { useLocation } from 'react-router-dom'

const Page404 = () => {
    const location = useLocation()
    const [path, setPath] = useState()
    useEffect(() => {
        setPath(location.pathname)
    })
    return (
        <div>
            <div className="flex flex-col items-center justify-center p-16 text-center ">


                <h1 className="text-[200px] font-bold text-transparent bg-gradient-to-br bg-clip-text animate-gradient">
                    404
                </h1>

                <p className="text-xl text-gray-700 mt-2">
                    You tried to access <span className="font-semibold text-black">{path}</span>, but this page doesn’t exist in our MERN application.
                </p>


                <div className='grid grid-cols-2'>
                    <img src={logo} alt="Not Found" className="w-40 h-40 mt-5" />
                    <div className='text-5xl tracking-widest font-bold font-serif flex justify-center items-center '>
                        <p className='text-[#47A248]'>M</p>
                        <p className='text-[#525050]'>E</p>
                        <p className='text-[#61DAFB]'>R</p>
                        <p className='text-[#339933]'>N</p>
                        
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Page404
