import express from "express";
import errorHandler from "./middlewares/errorHandler";
import {
    authRouter,
    friendRouter,
    profileRouter,
    userRouter,
} from "./routes/index";
import { connectDB } from "./db/connectDB";
import { IFriendship, Friendship } from "./models/friendship";
import { IUser } from "./models/user";
import { isObjectIdOrHexString, Types } from "mongoose";

const app = express();

app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/me", userRouter);
app.use("/friends", friendRouter);
app.get("/test", async (req, res) => {
    // let user1: IUser = {
    //     fullName: "Mary Jane",
    //     email: "mary@mail.com",
    //     password: "mary123",
    //     profilePic: "https://example.com/mary.jpg",
    // };

    // let user2: IUser = {
    //     fullName: "John Doe",
    //     email: "john@mail.com",
    //     password: "john123",
    //     profilePic: "https://example.com/john.jpg",
    // };
    // await User.create(user);
    // return res.json({ message: "User created successfully", user });

    const friendship: IFriendship = {
        sender: new Types.ObjectId("66b99e3bdddc3909a0ca6523"),
        receiver: new Types.ObjectId("66b99e6f900ddad03abc98b9"),
        status: "pending",
    };

    await Friendship.create(friendship);

    return res.json({ message: "Friendship created successfully", friendship });
});
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
