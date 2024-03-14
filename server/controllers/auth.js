import jwt from "jsonwebtoken";
import users from '../models/auth.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'alaksanpal2003@gmail.com', 
        pass: 'fiwglmfdiqqazrma', 
    },
    tls: {
        rejectUnauthorized: false 
    }
});

export const register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            try {
                const newUser = await users.create({ email, password, name });
                const token = generateToken(newUser);

                res.status(200).json({ result: newUser, token });
            } catch (error) {
                console.error("Error creating a new user:", error);
                res.status(500).json({ message: "Error creating a new user. Please try again." });
            }
        } else {
            const token = generateToken(existingUser);

            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found." });
        }

        if (existingUser.blocked && new Date() < existingUser.blockedUntil) {
            return res.status(401).json({ message: "Account is blocked. Please try again later." });
        }

        if (password === existingUser.password) {
            if (existingUser.blocked) {
                return res.status(401).json({ message: "Account is blocked. Please try again later." });
            }
            await users.findByIdAndUpdate(existingUser._id, { attempt: 0 });

            const token = generateToken(existingUser);

            res.status(200).json({ result: existingUser, token });
        } else {
            const updatedUser = await users.findByIdAndUpdate(existingUser._id, { $inc: { attempt: 1 } }, { new: true });

            if (updatedUser.attempt >= 3) {
                sendEmailNotification(existingUser.email, "Three consecutive failed login attempts detected.");
            }

            if (updatedUser.attempt >= 5) {
                const blockedUntil = new Date(Date.now() + 1 * 60 * 60 * 1000); // Block the account for one hour
                await users.findByIdAndUpdate(existingUser._id, { blocked: true, blockedUntil });

                sendEmailNotification(existingUser.email, "Your account has been blocked due to multiple failed login attempts. Please try again later.");

                setTimeout(async () => {
                    await users.findByIdAndUpdate(existingUser._id, { attempt: 0, blocked: false, blockedUntil: null });
                    console.log("Account unblocked after one hour.");
                }, 1 * 60 * 60 * 1000); 
            }

            res.status(401).json({ message: "Incorrect password." });
        }
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};



const generateToken = (user) => {
    return jwt.sign({
        email: user.email,
        id: user._id,
        name: user.name
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

const sendEmailNotification = async (email, message) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: "Account Security Alert",
            text: message
        });
        console.log("Email notification sent successfully.");
    } catch (error) {
        console.error("Error sending email notification:", error);
    }
};
