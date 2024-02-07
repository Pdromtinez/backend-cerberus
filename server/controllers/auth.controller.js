import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import UserModel from "../models/UserModel.js";

import { createToken } from "../utils/jwt.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

const saltRounds = 10;

const authController = {
    Register: async (req, res) => {
        try {
            const { profile_img, user_email, user_password, ...userData } = req.body;
    
            const existingUser = await UserModel.findOne({ where: { user_email } });
    
            if (existingUser) {
                return res.status(400).send("Email already in use");
            }
            let usr_img = {
                public_id: "",
                secure_url: ""
            }
            const result = await uploadImage(`data:image/jpeg;base64,${profile_img}`);
    
            if (!result) {
                return res.status(500).json({ error: "Error uploading image" });
            }
    
           usr_img = {
            public_id: result.public_id,
            secure_url: result.secure_url
           }
    
            const hashedPassword = await hashPassword(user_password, saltRounds);
    
            const newUser = await UserModel.create({
                user_email,
                user_password: hashedPassword,
                roles: "user",
                profile_img: usr_img,
                ...userData,
            });
    
            return res.status(201).json({ message: "User Created" });
        } catch (error) {
            console.error("Error in registration:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },

    Login: async (req, res) => {
        try {
            const { user_email, user_password } = req.body;
    
            const user = await UserModel.findOne({ where: { user_email } });
    
            if (!user || !(await comparePassword(user_password, user.user_password))) {
                return res.status(401).json({ message: "Invalid Email or Password" });
            }

    
            const token = createToken({ user});
            ("Generated token:", token);

            res.cookie("token", token, { httpOnly: true });
    
            return res.status(200).json({ token });
        } catch (error) {
            console.error("Error in login:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    
    

    Logout: (_req, res) => {
        try {
            res.clearCookie("token");
            return res.status(200).json({ message: "Logout successful" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
        },
};

export default authController;
