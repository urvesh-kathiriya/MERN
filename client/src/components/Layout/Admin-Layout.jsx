import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { User, Phone, Briefcase, AppWindow, House } from "lucide-react";
import logo from "/logo.png"
import { AdminUserContext } from '../../store/AdminUserStore';


const AdminLayout = () => {
    const { handlerdirect, def } = useContext(AdminUserContext)
    return (
        <div className='p-5'>
            <div className='border-2 border-gray-300 text-white rounded-md bg-gradient-to-b from-black/80 to-gray-900  backdrop-blur-md shadow-2xl'>
                <p className="text-amber-400 p-5 text-4xl flex justify-start items-center tracking-wide border-b-3 border-white">
                    <span className=" mt-1 relative after:absolute after:left-0.5 after:bottom-[-5px] after:h-[4px] after:w-[145px] after:bg-white after:rounded-full after:content-['']">
                        Admin Panel
                    </span>
                </p>
                <div className='p-10'>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 border-2 border-white rounded-md bg-gradient-to-b from-black/80 to-gray-900 '>
                        <div className='flex flex-col gap-6 justify-start items-start  border-r-2 p-5'>
                            <button className="text-cyan-400 tracking-wider font-serif font-bold flex mt-5" onClick={() => handlerdirect("users")}><User className="w-6 h-6 text-emerald-400 mr-2" />USERS</button>
                            <button className="text-cyan-400 tracking-wider font-serif font-bold flex" onClick={() => handlerdirect("contacts")}><Phone className="w-6 h-6 text-emerald-400 mr-2" />CONTACTS</button>
                            <button className="text-cyan-400 tracking-wider font-serif font-bold flex " onClick={() => handlerdirect("services")}><Briefcase className="w-6 h-6 text-emerald-400 mr-2" />SERVICES</button>
                            <button className="text-cyan-400 tracking-wider font-serif font-bold flex gap-2 mb-5" onClick={() => handlerdirect("home")}><House className="w-6 h-6 text-emerald-400 mr-2" />HOME
                                <img src={logo} alt="MERN" className='w-6 h-6' />
                            </button>

                        </div>

                        <div className='col-span-2'>
                            {def === "/admin" || def === "/admin/" ?
                                <div className='p-10'>
                                    <div>

                                        <p className="my-25 flex justify-center items-center text-6xl font-bold ml-10 tracking-[0.5em]  bg-gradient-to-b from-green-900 via-teal-700 to-amber-600 text-transparent bg-clip-text">MERN</p>
                                        <AppWindow className="w-6 h-6 text-white mb-2" />
                                        <h1 className='text-4xl text-amber-400'>Welcome to Admin Panel</h1>
                                        <p className='text-lg text-gray-400 mt-5'>Please select the options from the left side to manage the users, contacts and services</p>
                                    </div>

                                </div>
                                :
                                <Outlet />
                            }
                        </div>

                    </div>

                </div>





            </div>
        </div>
    )
}

export default AdminLayout
