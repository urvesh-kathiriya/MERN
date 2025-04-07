import { Mail, Pencil, Trash2, MessageCircle, SquareUserRound, ShieldUser } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { AdminUserContext } from '../../store/AdminUserStore'

const Admincontact = () => {

  const [varifiyId, setvarifiyId] = useState([])
  const { handleDelete,
    contacts,
    isLoading,
    users,
    deleteUser,
    setConfirmUser,
    confirmUser
   } = useContext(AdminUserContext)

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
                <div className='w-6 h-6'>
                <SquareUserRound className=" text-blue-400 " />
                </div>
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
              <div className='w-6 h-6'>
              <Mail className='text-green-400 ' />
              </div>
              <p>{contact.email}</p>

            </div>
            <div className='flex justify-start gap-5 items-start'>
              <div className='w-6 h-6'>
                <MessageCircle className=' text-red-400 ' />
              </div>
              <p className='truncate'>{contact.message}</p>
            </div>
            <div className='flex justify-center items-center mt-2 border-t-2 border-fuchsia-500 rounded-2xl'>
              <button className='flex justify-center items-center' onClick={() => handleDelete(contact._id, varifiyId.includes(contact.email), contact.username, "contacts")}>
                <Trash2 className='w-5 h-5 mt-3 text-cyan-400' />
              </button>

            </div>
          </div>

        )
        )}
      </div>
      {confirmUser && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-gradient-to-b from-black/80 to-gray-900 backdrop-blur-md p-6 rounded-md shadow-md w-96 flex flex-col justify-center items-center">
            <h1 className="text-lg font-bold text-gray-600 text-center">
              Are you sure you want to delete <span className="text-red-500 mx-1 tracking-wide">{confirmUser.username}</span> Contact ?
            </h1>
            <div className="flex gap-4 mt-4">
              <button onClick={() => setConfirmUser(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                No
              </button>
              <button onClick={() => deleteUser(confirmUser.id,"contacts")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  )
}

export default Admincontact
