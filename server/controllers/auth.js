import jwt from "jsonwebtoken";
import users from '../models/auth.js';

export const login = async (req, res) => {
    const { email } = req.body;
    console.log(email);

    try {
        const existingUser = await users.findOne({ email });
        console.log(existingUser);

        if (!existingUser) {
            try {
                const newUser = await users.create({ email });
                const token = jwt.sign({
                    email: newUser.email, id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                });

                res.status(200).json({ result: newUser, token });
            } catch (error) {
                console.error("Error creating a new user:", error);
                res.status(500).json({ message: "Error creating a new user. Please try again." });
            }
        } else {
            const token = jwt.sign({
                email: existingUser.email, id: existingUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            });

            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        console.error("Error in login route:", error);
        // res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};
