import React, { useContext, useEffect, useState } from 'react';
import { Mail, Pencil, Phone, Search, ShieldUser, SquareUserRound, Trash2 } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import { AdminUserContext } from '../../store/AdminUserStore';
import { AuthContext } from '../../store/auth';

const AdminUser = () => {
  const {
    isLoading,
    users,
    handleDelete,
    confirmUser,
    setConfirmUser,
    deleteUser,
    handledit,
    edituserId,
    editedUsers,
    setEditedUsers,
    handlesaveedituser,
    searchuser,
    setSearchuser,
    handleInputChange,
    conformemil,
    setConformemail,
    navigate
  } = useContext(AdminUserContext);
  const { data } = useContext(AuthContext)

  const [searchbar, setSearchbar] = useState(false);
  const handlenavigate = () => {
    navigate('/logout')
  }
  useEffect(() => {
    if (data) {
      setConformemail(data.Email)
    }
  }, [data])


  const handleSearchbarToggle = () => setSearchbar((prev) => !prev);

  const filteredNews = searchuser.length > 0
    ? users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(searchuser.toLowerCase())
    )
    : users;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#D946EF" size={15} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="grid col-span-2">
          <h1 className="text-5xl tracking-wider flex justify-end items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3">
            All Users
          </h1>
        </div>
        <button className="flex justify-end items-center">
          <Search className="w-8 h-8 mt-3 text-cyan-400 mr-6" onClick={handleSearchbarToggle} />
        </button>
      </div>

      {searchbar && (
        <div className="flex justify-center items-center mt-5">
          <input
            type="search"
            placeholder="Search Users..."
            className="py-2 px-3 text-amber-400 rounded-lg border border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-500 ease-in-out focus:outline-none"
            onChange={(e) => setSearchuser(e.target.value)}
          />
        </div>
      )}

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {filteredNews?.map((user) => (
          <div key={user._id} className="overflow-x-auto p-5 border-2 flex flex-col gap-2 border-gray-900 bg-gradient-to-b from-black/80 to-gray-900 text-orange-300 rounded-lg shadow-lg">
            <div className="flex justify-start gap-5 items-start">
              <div className='w-6 h-6'>
                <SquareUserRound className="text-blue-400" />
              </div>
              <input
                value={edituserId === user._id ? editedUsers?.User_name ?? "" : user.User_name}
                onChange={(e) => handleInputChange(user._id, 'User_name', e.target.value, "user")}
                disabled={edituserId !== user._id}
              />
            </div>
            <div className="flex justify-start gap-5 items-start">
              <div className='w-6 h-6'>
                <Mail className="text-green-400" />
              </div>
              <input
                value={edituserId === user._id ? editedUsers?.Email ?? "" : user.Email}
                onChange={(e) => handleInputChange(user._id, 'Email', e.target.value, "user")}
                disabled={edituserId !== user._id}
              />
            </div>
            <div className="flex justify-start gap-5 items-start">
              <div className='w-6 h-6'>
                <Phone className="text-red-400" />
              </div>
              <input
                value={edituserId === user._id ? editedUsers?.Number ?? "" : user.Number}
                onChange={(e) => handleInputChange(user._id, 'Number', e.target.value, "user")}
                disabled={edituserId !== user._id}
              />
            </div>
            <div className="flex justify-start gap-5 items-start">
              <div className='w-6 h-6'>
                <ShieldUser className="text-yellow-400" />
              </div>
              <input value={user.isAdmin ? 'Admin' : 'User'} disabled />
            </div>

            <div className="mt-2 border-t-2 border-fuchsia-500 rounded-2xl">
              {edituserId === user._id ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                  <button onClick={() => { handledit(null, null), setEditedUsers({}) }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                  <button onClick={() => { handledit(null, null), handlesaveedituser("users") }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </div>
              ) :

                conformemil !== user.Email ? (
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <button className="flex justify-center items-center" onClick={() => handledit(user._id, "user")}>
                      <Pencil className="w-5 h-5 mt-3 text-cyan-400" />
                    </button>
                    <button className="flex justify-center items-center" onClick={() => handleDelete(user._id, user.isAdmin, user.User_name, "users")}>
                      <Trash2 className="w-5 h-5 mt-3 text-cyan-400" />
                    </button>
                  </div>
                ) :
                    <div className='flex justify-center items-center'>
                      <button className=" " onClick={handlenavigate}>
                        <p className=' tracking-widest text-red-500 font-bold py-2 px-4 rounded'>
                          LOGOUT
                        </p>
                      </button>
                    </div>
              }
            </div>
          </div>
        ))}
      </div>

      {confirmUser && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-gradient-to-b from-black/80 to-gray-900 backdrop-blur-md p-6 rounded-md shadow-md w-96 flex flex-col justify-center items-center">
            <h1 className="text-lg font-bold text-gray-600 text-center">
              Are you sure you want to delete <span className="text-red-500 mx-1 tracking-wide">{confirmUser.username}</span>?
            </h1>
            <div className="flex gap-4 mt-4">
              <button onClick={() => setConfirmUser(null)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                No
              </button>
              <button onClick={() => deleteUser(confirmUser.id, "users")} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
