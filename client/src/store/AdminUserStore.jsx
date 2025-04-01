import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AdminUserContext = createContext();

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || '');
    const [isLoading, setIsLoading] = useState(true);
    const [confirmUser, setConfirmUser] = useState(null);
    const [edituserId, setEdituserId] = useState(null)
    const [editedUsers, setEditedUsers] = useState({
        _id: "",
        User_name: "",
        Email: "",
        Number: ""
    });
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (!token) return;
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${api}/api/admin/users`, {
                    headers: { 'authToken': `Bearer ${token || ''}` }
                });
                if (res.data) setUsers(res.data);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetchUsers();
    }, [token]);

    const handleDelete = async (id, isAdmin, username) => {
        if (isAdmin) {
            setConfirmUser({ id, username });
        } else {
            await deleteUser(id);
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${api}/api/admin/users/${id}`);
            if (response.status === 200) {
                setUsers(users.filter((user) => user._id !== id));
            }
            setConfirmUser(null);
        } catch (error) {
            console.log(error);
        }
    };
    const handledit = (userId) => {
        setEdituserId(userId)
        setEditedUsers({ _id: userId,...editedUsers });

    }

    const handlesaveediruser = async () => {
        try {
            if (!editedUsers._id) return;

            console.log("Saving User:", editedUsers);

            const response = await axios.put(`${api}/api/admin/users/${editedUsers._id}`, editedUsers);
            if (response.status === 200) {
                setUsers(users.map((user) => user._id === editedUsers._id ? editedUsers: user));
            }

            setEdituserId(null);
            setEditedUsers({});
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <AdminUserContext.Provider value={{ isLoading, users, handleDelete, confirmUser, setConfirmUser, deleteUser, handledit, edituserId, editedUsers, setEditedUsers, handlesaveediruser }}>
            {children}
        </AdminUserContext.Provider>
    );
};
