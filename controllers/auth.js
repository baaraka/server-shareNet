import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      profilePic: req.body.profilePic,
      password: hash,
    });

    await newUser.save();
    res.status(200).json("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(401, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(403, "incorrect password or username"));

    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    next(error);
  }
};
