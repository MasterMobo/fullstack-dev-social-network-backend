import { Request, RequestHandler, Response } from "express";
import { User } from "../../models/user";
import bcrypt from "bcryptjs";
interface ILogin {
  email?: string;
  password?: string;
}

const login: RequestHandler<unknown, unknown, ILogin, unknown> =
  async function (req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email)
        return res.status(401).json({ message: "Please enter your email." });
      if (!password)
        return res.status(401).json({ message: "Please enter your password." });

      const user = await User.findOne({ email })
        .select("+email +password")
        .exec();
      if (!user) {
        return res.status(401).json("Invalid email or password.");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json("Invalid email or password.");
      }

      res
        .cookie("userObj", user, { signed: true, maxAge: 60 * 60 * 1000 })
        .json({
          message: "Login successfully",
          user: user,
        });
    } catch (error) {
      next(error);
    }
  };

export default login;
