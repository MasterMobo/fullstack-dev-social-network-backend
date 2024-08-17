import e, { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../../models/user";
import bcript from "bcryptjs";
import { ConflictError, UnauthorizedError } from "../../errors";
import uploadImage from "../upload/uploadImage";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new UnauthorizedError("Missing credentials."));
    }

    const user = await User.findOne({ email });

    // Check if email is already taken
    if (user) {
        return next(new ConflictError("Email already taken."));
    }

    // Hash password
    const salt = await bcript.genSalt();
    const passwordHashed = await bcript.hash(password, salt);

    // Upload profile picture
    const profilePic = await uploadImage(req, res, next);

    if (!profilePic) {
        // uploadImage will handle the error, so we just return here
        return;
    }

    // Create new user
    const newUser = await User.create({
        fullName: fullName,
        email: email,
        password: passwordHashed,
        profilePic,
    });

    const publicUser = await User.findOne(newUser._id).exec();

    res.cookie("user", publicUser, {
        signed: true,
        maxAge: 60 * 60 * 1000,
    }).json({
        message: "Registered successfully",
        user: publicUser,
    });
};

export default register;
