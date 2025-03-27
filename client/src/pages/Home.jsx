import React, { useContext, useEffect, useRef } from 'react'
import image from "../assets/images/home_mern.png"
import mern from "../assets/images/mern.png"
import js from "../assets/images/JS.png"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../store/auth'



const animateValue = (obj, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = (progress * (end - start) + start).toFixed(1) + 'M+';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

const Home = () => {
  const naviagte = useNavigate()
  const refs = useRef([]);
  const values = [29.5, 146.8, 14.9, 7.5];
  const reDirect = (path) => {
    naviagte(path)
  }

  useEffect(() => {
    refs.current.forEach((ref, index) => {
      if (ref) {
        animateValue(ref, 0, values[index], 2000);
      }
    });
  }, []);

  return (
    <div>
      <div className='grid md:grid-cols-2 grid-cols-1  p-10 gap-4 '>
        <div className='md:order-1 order-2 p-5 mt-14'>
          <h1 className='flex justify-center items-center text-2xl text-amber-500 mr-5 font-serif '>Hello MERN!</h1>
          <p className='mt-3 mb-3 p-2 text-3xl font-bold font-mono'>MongoDB || Express || React || Node </p>
          <p className='py-8 tracking-wide'>The MERN stack is a popular web development framework comprised of MongoDB, Express.js, React, and Node.js, all built with JavaScript, simplifying full-stack development by using a single language across front and back-end! </p>
          <div className='flex gap-5 p-2'>
            <button className='rounded-2xl bg-blue-500 tracking-wide m-2 p-2' onClick={() => reDirect("/contact")}>Contact Now</button>
            <button className='rounded-2xl bg-blue-500 tracking-wide m-2 p-2' onClick={() => reDirect("/about")}>Learn More</button>
          </div>
        </div>
        <div className='md:order-2 order-1'>
          <img src={image} alt="" className='p-5' />
        </div>
      </div>

      <div className="px-30 mb-8">
        <p className='flex justify-center items-center text-5xl text-amber-500 p-3 font-serif'>Weekly Download!</p>
        <div className='bg-black text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-5 mt-5 rounded-4xl'>
          {["#47A248", "#ccc", "#61DAFB", "#339933"].map((color, index) => (
            <div
              key={index}
              className={`flex flex-col justify-center items-center border-white ${index !== 3 ? `md:border-r-3 ${index !== 1 ?"sm:border-r-3":""} border-b-3 sm:border-b-0` : ""
                }`}
            >
              <p
                ref={(el) => (refs.current[index] = el)}
                className='text-3xl font-bold font-mono p-2 tracking-wider'
              >
              </p>
              <p className='tracking-wide' style={{ color: color }}>
                {["MongoDB", "Express", "React", "Node"][index]}
              </p>
            </div>
          ))}
        </div>
      </div>


      <div className='grid p-15 sm:px-36 sm:py-12 md:px-72 md:py-25'>
        <div className=' bg-gray-700 rounded-4xl shadow-black shadow-2xl'>
          <div className='flex justify-center items-center text-4xl text-blue-500 p-3 font-serif tracking-wider '>
            <p className='border-b-5 border-amber-500 rounded-2xl p-5'>
              God Of MERN
            </p>
          </div>



          <div className='grid grid-cols-1 lg:grid-cols-2 mt-5'>

            <div className='p-10 flex justify-center items-center   '>
              <img src={js} alt="js" className='h-48 w-48' />
            </div>
            <div className='flex flex-col'>
              <p className='flex lg:justify-start justify-center text-4xl tracking-widest text-amber-300 p-5'>JavaScript</p>
              <div className='p-5 flex gap-5 text-xl'>
                <ul className='list-disc list-inside'>
                  <li>Creating dynamic web pages</li>
                  <li>Enabling users to interact with page elements</li>
                  <li>Allowing users to load content into a document without reloading the entire page</li>
                  <li>Developing mobile apps, desktop apps, and games</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-8 justify-center items-center p-8 mb-3'>
        <p className='flex justify-center items-center text-5xl text-indigo-700 border-b-5
           rounded-2xl border-black p-3 font-serif'>Architecture Of MERN! </p>
        <img src={mern} alt="" className='border-l-5 border-r-5 rounded-2xl p-3' />
      </div>


    </div>
  )
}

export default Home
