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
        const hashedPassword = await hash(password);
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