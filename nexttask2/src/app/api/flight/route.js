import { connectDb } from "@/database/db";
import { Flight } from "@/models/Flight";
import { NextResponse } from "next/server";

connectDb();

export async function GET() {
    try {
        const getFlight = await Flight.find();
        return NextResponse.json(getFlight.length > 0 ? getFlight : "Not Found111")
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: "Failed to get flight",
            },
            {
                status: 404,
            }
        )
    }
}

export async function POST(request) {
    const { flightNumber, origin, destination, status } = await request.json();

    // validation 
    if (!flightNumber || !origin || !destination || !status) {
        return NextResponse.json(
            {
                error: "All fields must be required",
            },
            {
                status: 404,
            }
        )
    }

    

    const flight = new Flight({
        flightNumber,
        origin,
        destination,
        status
    })

    try {
        const savedFlight = await flight.save();
        return NextResponse.json(
            {
                savedFlight,
                message: "Flight saved successfully"
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                error: "Failed to save flight",
            },
            {
                status: 404,
            }
        )
    }
}

