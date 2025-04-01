import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Activity, Castle, DollarSign, FileText, Pencil, Trash2 } from 'lucide-react'
import { AuthContext } from '../../store/auth'
import { BeatLoader } from 'react-spinners'

const AdminService = () => {
  const [services, setServices] = useState([])
  const { token } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchservices = async () => {
      try {
        const res = await axios.get(`${api}/api/admin/services`, {
          headers: {
            'authToken': 'Bearer ' + token ? token : ''
          }
        })
        if (res.data) {
          setServices(res.data)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchservices()
  }, [token])

  if (isLoading) return <div className="flex justify-center items-center h-screen"><BeatLoader color='#D946EF' size={15} /></div>
  return (
    <div>
      <h1 className='text-5xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3'>All Services</h1>
      <div className='p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 '>
        {services?.map((service, index) => (
          <div key={service._id || index} className=' p-5 border-2  flex flex-col gap-2  border-gray-900 bg-gradient-to-b from-black/80 to-gray-900 text-orange-300 rounded-lg shadow-lg '>
            <div className='flex justify-start gap-5 items-start'>
              <Activity  className="w-6 h-6 text-blue-400 " />
              <h2>{service.service}</h2>
            </div>
            <div className='flex justify-start gap-5 items-start'>
            <FileText  className='w-6 h-6 text-green-400 ' />
              <p className='truncate'>{service.description}</p>

            </div>
            <div className='flex justify-start gap-5 items-start'>
            <DollarSign  className='w-6 h-6 text-red-400 ' />
              <p>{service.price}</p>

            </div>
            <div className='flex justify-start gap-5 items-start'>
            <Castle className='w-6 h-6 text-yellow-400 ' />
              <p>{service.provider}</p>
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

export default AdminService
