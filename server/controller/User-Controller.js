import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserModel from "../Model/User-Model.js";
import jwt from 'jsonwebtoken';


export const home = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

export const register = async (req, res) => {
    try {
      const { User_name, Password, Number, Email, isAdmin } = req.body;

      if (!User_name || !Password || !Email || !Number  ) {
        return res.status(400).json({ message: "All fields are required", data: req.body });
      }
  
      const userExists = await UserModel.findOne({ Email });
  
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await hashPassword(Password);
  
      const newUser = new UserModel({
        User_name,
        Password: hashedPassword,
        Number,
        Email,
        isAdmin,
      });
  
      await newUser.save();
  
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          User_name,
          Email,
          isAdmin,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  };
  


export const login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ Email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email is not registered",
            });
        }

        const validPassword = await comparePassword(Password, user.Password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, Email: user.Email,isAdmin:user.isAdmin }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1d' } 
        );

        res.status(200).json({ 
            success: true,
            message: "Login successful",
            token 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};

export const data = async (req, res) => {
    try {
        const users = await req.user;
        const userdata = await UserModel.findById(users.userId).select({Password:0,__v:0});
        res.status(200).json(userdata);


    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}
