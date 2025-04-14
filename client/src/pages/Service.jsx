import { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo.png";
const Service = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(1)
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [ServiceLoading, setServiceLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${apiurl}/api/services?page=${page}&limit=${limit}`);
        setServices(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
        setServiceLoading(true)
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div>
      <div>
        <h1 className="flex justify-center items-center text-5xl font-mono tracking-wide text-fuchsia-800 mt-5 p-5">All Service</h1>
      </div>

      {ServiceLoading &&
        <div>
          <div className="md:px-40 px-20 mt-8 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
            {services?.map((service) => (
              <div key={service._id} className="bg-gray-500 p-5 border-2 border-gray-900 ">
                <div className="flex justify-center items-center mb-5 border-b-3 rounded-2xl p-5 border-gray-900">
                  <img src={logo} alt="MERN" />
                </div>
                <div className="flex justify-between items-center">
                  <p className="">{service.provider}</p>
                  <p className="">{service.price}</p>

                </div>
                <h2 className="my-3 text-3xl font-bold">{service.service}</h2>
                <p>{service.description}</p>
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
  );
};

export default Service;
