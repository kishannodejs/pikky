"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

const EditFlight = ({ params }) => {
    const router = useRouter()

    const [flight, setFlight] = useState({
        flightNumber: "",
        origin: "",
        destination: "",
        status: ""
    });

    const { flightId } = params


    const getFlightById = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/flight/${flightId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })

        const data = await res.json();
        console.log(data);
        console.log(data.getSingleFlight)
        setFlight({
            flightNumber: data.getSingleFlight?.flightNumber,
            origin: data.getSingleFlight?.origin,
            destination: data.getSingleFlight?.destination,
            status: data.getSingleFlight?.status
        })
    }


    const updateFlight = async () => {

        const res = await
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/flight/${flightId}`, {
                method: 'PUT',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    flightNumber: flight.flightNumber,
                    origin: flight.origin,
                    destination: flight.destination,
                    status: flight.status
                })
            })

        const data = await res.json();
        console.log(data)

        const { message, error } = data;
        if (error) {
            alert(error)
        }
        else {
            alert(message)
            router.push('/flight/flightlist')
        }
    }

    useEffect(() => {
        getFlightById();
    }, [flightId]);
    return (
        <div className=' container mx-auto flex justify-center items-center h-screen'>
           test
        </div>
    );
}

export default EditFlight;
