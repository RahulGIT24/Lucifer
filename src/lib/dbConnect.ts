import mongoose from "mongoose";

interface connected {
    isConnected?: number
}

const connectionObject: connected = {}

export const connectToDB = async () => {
    if (connectionObject.isConnected) {
        console.log("Already connected to DB");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        connectionObject.isConnected = db.connections[0].readyState;
        console.log("Database connected Successfully!")
    } catch (error) {
        console.log("Database connection failed!");
        process.exit(1)
    }
}