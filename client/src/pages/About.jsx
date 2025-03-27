import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import mongodb from "../assets/about/mongodb.png";
import express from "../assets/about/express.png";
import react from "../assets/about/react.png";
import node from "../assets/about/node.png";

const About = () => {
  const [dis, setDis] = useState("");

  const technologies = {
    M: {
      title: 'MongoDB',
      description: 'A NoSQL database that stores data in flexible, JSON-like documents.',
    },
    E: {
      title: 'Express.js',
      description: 'A fast, minimalist web framework for Node.js to build server-side applications.',
    },
    R: {
      title: 'React',
      description: 'A powerful front-end library for building interactive and dynamic user interfaces.',
    },
    N: {
      title: 'Node.js',
      description: 'A JavaScript runtime that allows building scalable and high-performance server-side applications.',
    },
  };

  return (
    <div>
      <div className='grid grid-cols-2  md:grid-cols-4 p-5 gap-12 justify-center items-center'>
        <img src={mongodb} alt="MongoDB" className="md:h-[300px] md:w-[300px] sm:h-[150px] sm:w-[150px] h-[75px] w-[75px] drop-shadow-lg rounded-lg cursor-pointer mt-5 md:p-15 " onClick={() => setDis("M")} />
        <img src={express} alt="Express" className="md:h-[300px] md:w-[300px] sm:h-[150px] sm:w-[150px] h-[75px] w-[75px] drop-shadow-lg rounded-lg cursor-pointer mt-5 md:p-15 " onClick={() => setDis("E")} />
        <img src={react} alt="React" className="md:h-[300px] md:w-[300px] sm:h-[150px] sm:w-[150px] h-[75px] w-[75px] drop-shadow-lg rounded-lg cursor-pointer mt-5 md:p-15 " onClick={() => setDis("R")} />
        <img src={node} alt="Node.js" className="md:h-[300px] md:w-[300px] sm:h-[150px] sm:w-[150px] h-[75px] w-[75px] drop-shadow-lg rounded-lg cursor-pointer mt-5 md:p-15 " onClick={() => setDis("N")} />
      </div>
      {dis && (
        <div className='bg-gray-700 p-6 rounded-4xl shadow-black shadow-2xl text-white text-center m-6'>
          <h2 className='text-3xl font-bold text-green-400'>{technologies[dis].title}</h2>
          <p className='text-lg mt-2 italic'>{technologies[dis].description}</p>
        </div>
      )}
    </div>
  );
};

export default About;
