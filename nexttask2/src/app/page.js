"use client"
import Link from 'next/link';
import React from 'react';


const Home = () => {
  return (
    <div className=' flex justify-center items-center h-screen'>
      <div className="">
        <Link href='/flight/flightlist'>
          <button
            className='border border-gray-400 rounded-lg font-medium px-3 py-1.5 mx-2'>
            View Flight Details
          </button>
        </Link>

        <Link href='/flight/addflight'>
        <button
          className='border border-gray-400 rounded-lg font-medium px-3 py-1.5'>
          Add Flight
        </button>
        </Link>
        
      </div>
    </div>
  );
}

export default Home;
