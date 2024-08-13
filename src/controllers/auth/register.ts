import { Request, RequestHandler, Response } from "express";
import { User } from "../../models/user";
import bcript from "bcryptjs";
interface IRegister {
  fullName?: string;
  email?: string;
  password?: string;
  profilePic?: string;
}

const register: RequestHandler<unknown, unknown, IRegister, unknown> = async (
  req,
  res,
  next
) => {
  const { fullName, email, password, profilePic } = req.body;

  try {
    if (!fullName || !email || !password || !profilePic) {
      return res.status(400).json({ message: "Missing credentials." });
    }

    const user = await User.findOne({ email }).exec();
    if (user) {
      return res.status(409).json({ message: "Email already taken." });
    }

    const salt = await bcript.genSalt();
    const passwordHashed = await bcript.hash(password, salt);

    const newUser = await User.create({
      fullName: fullName,
      email: email,
      password: passwordHashed,
      profilePic: profilePic,
    });

    const publicUser = await User.findOne(newUser._id).exec();

    res
      .cookie("user", newUser, { signed: true, maxAge: 60 * 60 * 1000 })
      .json({ message: "Register succesfully", user: publicUser });
  } catch (error) {
    next(error);
  }
};

export default register;
