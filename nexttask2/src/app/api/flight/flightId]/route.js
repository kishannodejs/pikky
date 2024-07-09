import { Flight } from "@/models/Flight";
import { NextResponse } from "next/server";


export async function GET(reuest, { params }) {
    const { flightId } = params;

    try { console.log(flightId)
        const getSingleFlight = await Flight.findById(flightId)
       
        return NextResponse.json(
            {
                getSingleFlight,
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: 'failed to get single flight',
            },
            {
                status: 404,
            }
        )
    }
}

export async function PUT(request, { params }) {
    const { flightId } = params;

    const { flightNumber, origin, destination, status } = await request.json();

    try {
        let flight = await Flight.findById(flightId);
        flight.flightNumber = flightNumber;
        flight.origin = origin;
        flight.destination = destination;
        flight.status = status;

        const updatedFlight = await flight.save();
        return NextResponse.json(
            {
                updatedFlight,
                message: "Flight Updated Successfully"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error: 'failed to update flight',
            },
            {
                status: 404,
            }
        )
    }
}


export async function DELETE(request, { params }) {
    const { flightId } = params;

    try {
        await Flight.deleteOne({
            _id: flightId
        })
        return NextResponse.json(
            {
                message: "Flight deleted successfully"
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error: 'failed to delete flight',
            },
            {
                status: 404,
            }
        )
    }
}