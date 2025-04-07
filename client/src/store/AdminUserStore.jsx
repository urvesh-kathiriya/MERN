import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./auth";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminUserContext = createContext();

export const AdminProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [contacts, setContacts] = useState([])
    const [services, setServices] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || "")
    const [isLoading, setIsLoading] = useState(true);
    const [confirmUser, setConfirmUser] = useState(null);
    const [edituserId, setEdituserId] = useState(null)
    const [searchuser, setSearchuser] = useState([])
    const [conformemil, setConformemail] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const [def, setDef] = useState()
    const [editedUsers, setEditedUsers] = useState({
        _id: "",
        User_name: "",
        Email: "",
        Number: ""
    });
    const [editedServices, setEditedServices] = useState({
        _id: "",
        service: "",
        description: "",
        price: "",
        provider: ""

    });
    const api = import.meta.env.VITE_API_URL;

    const handlerdirect = (path) => {
        path === "home" ? navigate(`/`) : navigate(`/admin/${path}`)
    }
    useEffect(() => {
        setDef(location.pathname)
    }, [def, navigate])

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

    const handleInputChange = (id, field, value, edit) => {
        const updateFunction = edit === "user" ? setEditedUsers : setEditedServices;
        updateFunction((prev) => ({
            ...prev,
            _id: id,
            [field]: value,
        }));
    };
    const handleDelete = async (id, isAdmin, username, route) => {
        if (isAdmin) {
            setConfirmUser({ id, username });
        } else {
            await deleteUser(id, route);
        }
    };

    const deleteUser = async (id, route) => {
        try {
            const response = await axios.delete(`${api}/api/admin/${route}/${id}`);
            if (response.status === 200) {
                if (route === "users") setUsers(users.filter((user) => user._id !== id));
                if (route === "contacts") setContacts(contacts.filter((contact) => contact._id !== id));
                if (route === "services") setServices(services.filter((service) => service._id !== id));
            }
            setConfirmUser(null);
        } catch (error) {
            console.log(error);
        }
    };
    const handledit = (userId, edit) => {
        if (edit === "user") {
            const userToEdit = users.find(user => user._id === userId);
            if (userToEdit) {
                setEditedUsers({
                    _id: userToEdit._id,
                    User_name: userToEdit.User_name,
                    Email: userToEdit.Email,
                    Number: userToEdit.Number
                });
            }
        } else {
            const serviceToEdit = services.find(service => service._id === userId);
            if (serviceToEdit) {
                setEditedServices({
                    _id: serviceToEdit._id,
                    service: serviceToEdit.service,
                    description: serviceToEdit.description,
                    price: serviceToEdit.price,
                    provider: serviceToEdit.provider
                });
            }
        }
        setEdituserId(userId);
    };

    const handlesaveedituser = async (edit) => {
        try {
            if (!editedUsers._id && !editedServices._id) return;

            const edited = edit === "users" ? editedUsers : editedServices;
            const response = await axios.put(`${api}/api/admin/${edit}/${edited._id}`, edited);

            if (response.status === 200) {
                if (edit === "users") {
                    setUsers(users.map((user) =>
                        user._id === editedUsers._id ? { ...user, ...editedUsers } : user
                    ));
                    setEditedUsers({ _id: "", User_name: "", Email: "", Number: "" });
                }
                if (edit === "services") {
                    setServices(services.map((service) =>
                        service._id === editedServices._id ? { ...service, ...editedServices } : service
                    ));
                    setEditedServices({ _id: "", service: "", description: "", price: "", provider: "" });
                }
            }

            setEdituserId(null);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <AdminUserContext.Provider value={{
            isLoading,
            navigate,
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
            contacts,
            setContacts,
            services,
            setServices,
            handleInputChange,
            editedServices,
            setEditedServices,
            def,
            handlerdirect,
            conformemil, 
            setConformemail

        }}>
            {children}
        </AdminUserContext.Provider>
    );
};
