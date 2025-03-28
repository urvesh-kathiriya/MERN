import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Mail, Pencil, Phone, ShieldUser, SquareUserRound, Trash2 } from 'lucide-react'

const Adminuser = () => {
  const [users, setUsers] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await axios.get(`${api}/api/admin/users`, {
          headers: {
            'authToken': 'Bearer ' + token ? token : ''
          }
        })
        if (res.data) {
          setUsers(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchusers()
  }, [])



  return (
    <div>
      <h1 className='text-5xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3'>All Users</h1>
      <div className='p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 '>
        {users?.map((user, index) => (
          <div key={user._id || index} className=' p-5 border-2  flex flex-col gap-2  border-gray-900 bg-gradient-to-b from-black/80 to-gray-900 text-orange-300 rounded-lg shadow-lg '>
            <div className='flex justify-start gap-5 items-start'>
              <SquareUserRound className="w-6 h-6 text-blue-400 " />
              <h2>{user.User_name}</h2>
            </div>
            <div className='flex justify-start gap-5 items-start'>
              <Mail className='w-6 h-6 text-green-400 ' />
              <p>{user.Email}</p>

            </div>
            <div className='flex justify-start gap-5 items-start'>
              <Phone className='w-6 h-6 text-red-400 ' />
              <p>{user.Number}</p>

            </div>
            <div className='flex justify-start gap-5 items-start'>
              <ShieldUser className='w-6 h-6 text-yellow-400 ' />
              <p>{user.isAdmin ? 'Admin' : 'User'}</p>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mt-2 border-t-2 border-fuchsia-500 rounded-2xl'>
              <div className='flex justify-center items-center'>
                <Pencil className='w-5 h-5 mt-3 text-cyan-400 ' />
              </div>
              <div className='flex justify-center items-center'>
                <Trash2 className='w-5 h-5 mt-3 text-cyan-400' />
              </div>

            </div>
          </div>

        )
        )}
      </div>

    </div>
  )
}

export default Adminuser
