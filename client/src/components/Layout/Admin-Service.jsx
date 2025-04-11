import React, { useContext } from 'react'
import { Activity, Castle, DollarSign, FileText, Pencil, Trash2 } from 'lucide-react'
import { BeatLoader } from 'react-spinners'
import { AdminUserContext } from '../../store/AdminUserStore'

const AdminService = () => {
  const { isLoading,
    services,
    handleDelete,
    handledit,
    handlesaveedituser,
    edituserId,
    editedServices,
    setEditedServices,
    handleInputChange
  } = useContext(AdminUserContext)



  if (isLoading) return <div className="flex justify-center items-center h-screen"><BeatLoader color='#D946EF' size={15} /></div>
  return (
    <div>
      <h1 className='text-5xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3'>All Services</h1>
      <div className='p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4 '>
        {services?.map((service, index) => (
          <div key={service._id || index} className=' p-5 border-2  flex flex-col gap-2  border-gray-900 bg-gradient-to-b from-black/80 to-gray-900 text-orange-300 rounded-lg shadow-lg '>
            <div className='flex justify-start gap-5 items-start'>
              <div className='w-6 h-6'>
                <Activity className=" text-blue-400 " />
              </div>
              <input className='truncate'
                value={edituserId === service._id ? editedServices?.service ?? "" : service.service}
                onChange={(e) => handleInputChange(service._id, 'service', e.target.value, "service")}
                disabled={edituserId !== service._id}

              />
            </div>
            <div className='flex justify-start gap-5 items-start'>
              <div className='w-6 h-6'>
                <FileText className=' text-green-400 ' />
              </div>
              <input className='truncate'
                value={edituserId === service._id ? editedServices?.description ?? "" : service.description}
                onChange={(e) => handleInputChange(service._id, 'description', e.target.value, "service")}
                disabled={edituserId !== service._id} />

            </div>
            <div className='flex justify-start gap-5 items-start'>
              <div className='w-6 h-6'>
                <DollarSign className='text-red-400' />
              </div>

              {edituserId === service._id ? (
                (() => {
                  const fullPrice = editedServices?.price ?? service.price ?? "";
                  const priceParts = fullPrice.split('-');
                  const firstPrice = priceParts[0]?.replace('$', '') ?? "";
                  const secondPrice = priceParts[1]?.replace('$', '') ?? "";

                  return (
                    <div className='flex items-center gap-1'>
                      <p>$</p>
                      <input
                        value={firstPrice}
                        onChange={(e) => {
                          if (e.target.value.length < 5) handleInputChange(service._id, 'price', `$${e.target.value}-$${secondPrice}`, "service")
                        }
                        }
                        disabled={edituserId !== service._id}
                        className='w-14 px-1 border border-gray-300 rounded'
                      />
                      <p>-</p>
                      <p>$</p>
                      <input
                        value={secondPrice}
                        onChange={(e) => {
                          if (e.target.value.length < 5) handleInputChange(service._id, 'price', `$${firstPrice}-$${e.target.value}`, "service")
                        }
                        }
                        disabled={edituserId !== service._id}
                        className='w-14 px-1 border border-gray-300 rounded'
                      />
                    </div>
                  );
                })()
              ) : (
                <p>{service.price}</p>
              )}
            </div>

            <div className='flex justify-start gap-5 items-start'>
              <div className=''>
                <Castle className=' text-yellow-400 ' />
              </div>
              <input
                value={edituserId === service._id ? editedServices?.provider ?? "" : service.provider}
                onChange={(e) => handleInputChange(service._id, 'provider', e.target.value, "service")}
                disabled={edituserId !== service._id}
              />
            </div>
            <div className='mt-2 border-t-2 border-fuchsia-500 rounded-2xl'>
              {edituserId === service._id ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                  <button onClick={() => { handledit(null, null), setEditedServices({}) }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                  <button onClick={() => { handledit(null, null), handlesaveedituser("services") }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                  <button className="flex justify-center items-center" onClick={() => handledit(service._id, "service")}>
                    <Pencil className="w-5 h-5 mt-3 text-cyan-400" />
                  </button>
                  <button className="flex justify-center items-end" onClick={() => handleDelete(service._id, null, null, "services")}>
                    <Trash2 className="w-5 h-5 mt-3 text-cyan-400" />
                  </button>
                </div>
              )}

            </div>
          </div>

        )
        )}
      </div>

    </div>
  )
}

export default AdminService
