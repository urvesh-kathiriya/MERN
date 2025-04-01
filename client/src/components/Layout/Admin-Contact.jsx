import axios from 'axios'
import { Mail, Pencil, Trash2, MessageCircle, SquareUserRound, ShieldUser } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../store/auth'
import { BeatLoader } from 'react-spinners'
import { AdminUserContext } from '../../store/AdminUserStore'

const Admincontact = () => {

  const [contacts, setContacts] = useState([])
  const { token } = useContext(AuthContext)
  const { users } = useContext(AdminUserContext)
  const [varifiyId, setvarifiyId] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchcontacts = async () => {
      try {
        const res = await axios.get(`${api}/api/admin/contacts`, {
          headers: {
            'authToken': 'Bearer ' + token ? token : ''
          }
        })
        if (res.data) {
          setContacts(res.data)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchcontacts()
  }, [token])

  useEffect(() => {
    users?.forEach((user) => {
      if (user.isAdmin) {
        setvarifiyId((prev) => [...prev, user.Email]);
      }
    });
  }, [users]);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><BeatLoader color='#D946EF' size={15} /></div>

  return (
    <div>
      <h1 className='text-5xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3'>All Contacts</h1>
      <div className='p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 '>
        {contacts?.map((contact, index) => (
          <div key={contact._id || index} className=' p-5 border-2  flex flex-col gap-2  border-gray-900 bg-gradient-to-b from-black/80 to-gray-900 text-orange-300 rounded-lg shadow-lg min-h-[150px]'>
            <div className='flex  justify-between items-center'>
              <div className='flex justify-start gap-5 items-start'>
                <SquareUserRound className="w-6 h-6 text-blue-400 " />
                <h2>{contact.username}</h2>
              </div>
              {varifiyId.includes(contact.email) &&
                <div className="relative group">
                <ShieldUser className="w-6 h-6 text-yellow-400 cursor-pointer" />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600  text-yellow-400 text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-10 shadow-lg">
                ADMIN
              </div>

              </div>
              }
            </div>
            <div className='flex justify-start gap-5 items-start'>
              <Mail className='w-6 h-6 text-green-400 ' />
              <p>{contact.email}</p>

            </div>
            <div className='flex justify-start gap-5 items-start'>
              <MessageCircle className='w-6 h-6 text-red-400 ' />
              <p className='truncate' >{contact.message}</p>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-3 mt-2 border-t-2 border-fuchsia-500 rounded-2xl'>
              <button className='flex justify-center items-center'>
                <Pencil className='w-5 h-5 mt-3 text-cyan-400 ' />
              </button>
              <button className='flex justify-center items-center'>
                <Trash2 className='w-5 h-5 mt-3 text-cyan-400' />
              </button>

            </div>
          </div>

        )
        )}
      </div>

    </div>

  )
}

export default Admincontact
