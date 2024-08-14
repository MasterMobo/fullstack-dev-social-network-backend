import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";
import { UnauthorizedError } from "../../errors";
interface ILogin {
    email?: string;
    password?: string;
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) return next(new UnauthorizedError("Please enter your email."));
    if (!password)
        return next(new UnauthorizedError("Please enter your password."));

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new UnauthorizedError("Invalid email or password."));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new UnauthorizedError("Invalid email or password."));
    }

    const publicUser = user.toObject() as { [key: string]: any };
    delete publicUser.password;

    res.cookie("user", publicUser, {
        signed: true,
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
    }).json({
        message: "Login successfully",
        user: publicUser,
    });
};

export default login;
