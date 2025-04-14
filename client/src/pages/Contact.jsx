import React, { useState, useEffect, useContext } from 'react';
import image from "../assets/images/contact.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../store/auth';
import { toast } from 'react-toastify';


const Contact = () => {
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL
  const { data, token } = useContext(AuthContext)
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: ""
  });
  const [Allcontacts, setAllcontacts] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [ContactLoading, setContactLoading] = useState(false)


  useEffect(() => {
    if (data) {
      setContact({
        username: data.User_name || "",
        email: data.Email || "",
        message: ""
      });

    }
  }, [data]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiurl}/api/contact`, contact);
      if (res.status === 200) {
        toast.success('Message sent successfully !', {
          position: "bottom-center",
          autoClose: 5000,
          theme: "dark",
        });
        setContact({
          ...contact,
          message: ""
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchAllContacts = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/contact?page=${page}&limit=${limit}`,
          {
            headers: { 'authToken': `Bearer ${token || ''}` }
          }
        )
        if (res.status === 200) {
          console.log(res.data)
          setAllcontacts(res.data.data)
          setTotalPages(res.data.totalPages);
          setTotalItems(res.data.totalItems);
          setContactLoading(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllContacts()

  }, [page])

  const handleContact = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };



  return (
    <div>
      <div className='mt-5 tracking-wide'>
        <p className='ml-25 text-6xl'>
          <span className="relative after:absolute after:left-0.5 after:bottom-[-5px] after:h-[4px] after:w-[145px] after:bg-blue-800 after:rounded-full after:content-['']">
            Contact Us
          </span>
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 p-15 ml-32'>
          <div className='flex justify-center items-center'>
            <img src={image} alt="Contact Us" />
          </div>
          <div className='flex items-center'>
            <form className="bg-gray-200 p-6 rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
              <label htmlFor='username' className="block mb-2">Username</label>
              <input type="text" id='username' name="username" className="w-full p-2 border border-gray-600 rounded mb-4" value={contact.username} onChange={handleContact} placeholder="Enter username" required />

              <label htmlFor='email' className="block mb-2">Email</label>
              <input type="email" id='email' name="email" className="w-full p-2 border border-gray-600 rounded mb-4" value={contact.email} onChange={handleContact} placeholder="Enter Email" required disabled />

              <label htmlFor='message' className="block mb-2">Message</label>
              <textarea name="message" id='message' className="w-full p-2 border border-gray-600 rounded mb-4" value={contact.message} onChange={handleContact} placeholder="Enter Message" required />

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='p-5 m-5'>
        {ContactLoading &&
          <div className='p-5 m-5'>
            <div className='grid grid-cols-3'>
              {Allcontacts?.map((item) => (
                <div key={item._id} className="bg-gray-200 p-6 rounded-lg shadow-lg w-96 mt-5">
                  <div>
                    <p>{item.username}</p>
                  </div>
                  <div>
                    <p>{item.email}</p>
                  </div>
                  <div>
                    <p>{item.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center gap-5 mt-5 p-5">
              <div className="bg-gray-500 px-5 py-3">
                <button onClick={handlePrev} disabled={page === 1}>
                  Prev
                </button>
              </div>
              <span >
                Page {page} of {totalPages}
              </span>
              <div className="bg-gray-500 px-5 py-3">
                <button onClick={handleNext} disabled={page === totalPages}>
                  Next
                </button>
              </div>
            </div>
          </div>
        }




      </div>
      <section className='mb-3'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.3850145886067!2d72.67114557673465!3d23.046342179157012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e87455c9e0e2b%3A0x348e32f0d0b9217f!2sCompatible%20Solutions!5e0!3m2!1sen!2sin!4v1741856149805!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </section>
    </div>
  );
};

export default Contact;
