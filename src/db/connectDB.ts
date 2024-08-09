const mongoose = require("mongoose");
import env from "../config/env";
const { MONGO_URI } = env;

const connectUri = MONGO_URI;

const connectDB = async () => {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(connectUri);
    console.log("Successfully connected to MongoDB!");
};

export { connectDB };
