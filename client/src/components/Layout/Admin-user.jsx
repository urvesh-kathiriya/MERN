import React, { useContext, useEffect, useState } from 'react';
import { Mail, Pencil, Phone, ShieldUser, SquareUserRound, Trash2 } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import { AdminUserContext } from '../../store/AdminUserStore';

const AdminUser = () => {
  const { isLoading, users, handleDelete, confirmUser, setConfirmUser, deleteUser, handledit, edituserId, editedUsers, setEditedUsers, handlesaveediruser } = useContext(AdminUserContext);

  const handleInputChange = (id, field, value) => {
    if (editedUsers) {
      setEditedUsers({
        _id:id,
        [field]:value
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><BeatLoader color='#D946EF' size={15} /></div>;
  }

  return (
    <div>
      <h1 className="text-5xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3">
        All Users
      </h1>

      <div className="p-5 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {users?.map((user) => (
          <div key={user._id} className="overflow-x-auto p-5 border-2 flex flex-col gap-2 border-gray-900 bg-gradient-to-b from-black/80 to-gray-900 text-orange-300 rounded-lg shadow-lg">
            <div className="flex justify-start gap-5 items-start">
              <SquareUserRound className="w-6 h-6 text-blue-400" />
              <input
                value={edituserId === user._id ? editedUsers?.User_name || user.User_name : user.User_name}
                onChange={(e) => handleInputChange(user._id, 'User_name', e.target.value)}
                disabled={edituserId !== user._id}
              />
            </div>
            <div className="flex justify-start gap-5 items-start">
              <Mail className="w-6 h-6 text-green-400" />
              <input
                value={edituserId === user._id ? editedUsers?.Email || user.Email : user.Email}
                onChange={(e) => handleInputChange(user._id, 'Email', e.target.value)}
                disabled={edituserId !== user._id}
              />
            </div>
            <div className="flex justify-start gap-5 items-start">
              <Phone className="w-6 h-6 text-red-400" />
              <input
                value={edituserId === user._id ? editedUsers?.Number || user.Number : user.Number}
                onChange={(e) => handleInputChange(user._id, 'Number', e.target.value)}
                disabled={edituserId !== user._id}
              />
            </div>
            <div className="flex justify-start gap-5 items-start">
              <ShieldUser className="w-6 h-6 text-yellow-400" />
              <input value={user.isAdmin ? 'Admin' : 'User'} disabled />
            </div>

            <div className="mt-2 border-t-2 border-fuchsia-500 rounded-2xl">
              {edituserId === user._id ? (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3">
                  <button onClick={() => { handledit(null), setEditedUsers({}) }} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                  <button onClick={() => { handledit(null), handlesaveediruser() }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                </div>
              ) : (
                <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                  <button className="flex justify-center items-center" onClick={() => { handledit(user._id)}}>
                    <Pencil className="w-5 h-5 mt-3 text-cyan-400" />
                  </button>
                  <button className="flex justify-center items-center" onClick={() => handleDelete(user._id, user.isAdmin, user.User_name)}>
                    <Trash2 className="w-5 h-5 mt-3 text-cyan-400" />
                  </button>
                </div>
              )}
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
              <button onClick={() => deleteUser(confirmUser.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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