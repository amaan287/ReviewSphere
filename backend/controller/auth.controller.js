import { compare, hash } from '../utils/srypt.js';
import jwt from "jsonwebtoken";
import { handleError } from '../middleware/error.js';
import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();
export const register = async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(handleError(400, "Please provide all fields"));
    }
    try {
        const hashedPassword = await hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });
        res.status(200).json({ message: "Signup successfull", data: user });

    } catch (error) {
        console.log("error registering user: ", error);
        next(handleError(500, error));
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(handleError(400, "Please provide all fields"));
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return next(handleError(400, "Invalid credentials"));
        }
        const isMatch = await compare(password, user.password, 10);
        if (!isMatch) {
            return next(handleError(400, "Invalid credentials"));
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        });

        const { password: userPassword, ...userData } = user;
        res.status(200).json({ message: "Signin successfull", data: userData, access_token: token });

    } catch (error) {
        console.log("error signing in user: ", error);
        next(handleError(500, error));
    }
}