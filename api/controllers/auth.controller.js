import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
    export const signup = async (req, res, next) => {
      const { username, email, password } = req.body;
      const hashedpassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({ username, email, password: hashedpassword });
  
      try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
              return res.status(400).json({ success: false, message: "User already exists!" });
          }
          await newUser.save();
          return res.status(201).json({ success: true, message: "User successfully registered" });
      } catch (error) {
          next(error); // This will trigger the default error handler middleware
      }
  };


export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, "User Not Found!"));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, "Invalid Credentials!"));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      const expiryDate = new Date(Date.now()+3600000); // 1 hour 
      res
        .cookie("access_token", token, { httpOnly: true , expires: expiryDate })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
