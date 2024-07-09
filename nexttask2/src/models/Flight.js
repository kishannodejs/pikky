import mongoose, { Schema } from "mongoose";

const FlightSchema = new Schema({
    flightNumber: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true,
        unique: true
    },
    destination: {
        type: String,
        required: true
    },
   
    scheduledDepartureTime: {
        type: Date,
        //required: true
    },
    status: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export const Flight =
    mongoose.models.Flight || mongoose.model('Flight', FlightSchema)