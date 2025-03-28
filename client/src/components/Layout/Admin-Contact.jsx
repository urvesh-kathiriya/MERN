import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Admincontact = () => {

  const [service, setService] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token'))
  const api = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const res = await axios.get(`${api}/api/admin/services`, {
          headers: {
            'authToken': 'Bearer ' + token ? token : ''
          }
        })
        if (res.data) {
          setService(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchusers()
  }, [])
  
  return (
    <div >
      <h1 className='text-5xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3'>All Contacts</h1>

    </div>

  )
}

export default Admincontact
