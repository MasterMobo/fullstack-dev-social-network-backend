import express from "express";
import errorHandler from "./middlewares/errorHandler";
import {
    authRouter,
    friendRouter,
    profileRouter,
    userRouter,
} from "./routes/index";
import { connectDB } from "./db/connectDB";

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/me", userRouter);
app.use("/friends", friendRouter);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.log("Error starting server: ", error);
    }
};

start();
