import express from "express";
import errorHandler from "./middlewares/errorHandler";
import {
    authRouter,
    friendRouter,
    profileRouter,
    userRouter,
    imageRouter,
    adminRouter,
    groupRouter,
} from "./routes/index";
import { connectDB } from "./db/connectDB";
import cookieParser from "cookie-parser";
import env from "./config/env";
import cors from "cors";
import postRouter from "./routes/postRoutes";
import { authMiddleware } from "./middlewares";
import notFoundHandler from "./middlewares/notFoundHandler";
import notificationRouter from "./routes/notificationRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/profile", authMiddleware, profileRouter);
app.use("/me", authMiddleware, userRouter);
app.use("/friends", authMiddleware, friendRouter);
app.use("/posts", authMiddleware, postRouter);
app.use("/admin", authMiddleware, adminRouter);
app.use("/groups", authMiddleware, groupRouter);
app.use("/notifications", authMiddleware, notificationRouter);
app.use("/images", imageRouter);
app.use("*", notFoundHandler);

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
