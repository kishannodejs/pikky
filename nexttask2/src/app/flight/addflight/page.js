"use client"
import Link from 'next/link';
import React, { useState } from 'react';


const AddFlight = () => {
    const [flight, setFlight] = useState({
        flightNumber: "",
        origin: "",
        destination: "",
        status: ""
    });


    const addFlightDetail = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/flight`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                flightNumber: flight.flightNumber,
                origin: flight.origin,
                destination: flight.destination,
                status: flight.status
            })
        })

        const data = await res.json();
        const { message, error } = data;

        if (error) {
            alert(error)
        } else {
            alert(message)
        }


    }
    return (
        <div className=' container mx-auto flex justify-center items-center h-screen'>
            <div className="form border shadow-md border-gray-400 rounded-xl py-6 px-9  ">
                <div className="top">
                    <div className="flex gap-[40px] mb-5 items-center">
                        <Link href='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </Link>

                        <h1 className='text-2xl font-semibold'>Add Flight Detail</h1>
                    </div>
                </div>

                <div className="bottom">
                    <div className="">
                        <input
                            type="text"
                            name='flightNumber'
                            placeholder='Enter Flight Number'
                            value={flight.flightNumber}
                            onChange={(e) => setFlight({
                                ...flight,
                                flightNumber: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    <div className="">
                        <input
                            type="text"
                            name='origin'
                            placeholder='Enter origin'
                            value={flight.origin}
                            onChange={(e) => setFlight({
                                ...flight,
                                origin: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    <div className="">
                        <input
                            type="text"
                            name='destination'
                            placeholder='Enter destination'
                            value={flight.destination}
                            onChange={(e) => setFlight({
                                ...flight,
                                destination: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400'
                        />
                    </div>

                    <div className="">
                        <input
                            type="text"
                            name='status'
                            placeholder='Enter status'
                            value={flight.status}
                            onChange={(e) => setFlight({
                                ...flight,
                                status: e.target.value
                            })}
                            className='border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-8 placeholder-gray-400'
                        />
                    </div>

                    <div>
                        <button onClick={addFlightDetail} className=' bg-gray-100 hover:bg-gray-200 w-full py-1.5 border border-gray-400 rounded-md font-medium mb-5'>Add Detail</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddFlight;
