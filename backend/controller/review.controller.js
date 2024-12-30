
import { handleError } from '../middleware/error.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createReview = async (req, res, next) => {
    const { rating,
        reviewType,
        role,
        companyName,
        responsibilities,
        feedback,
        hoursPerWeek,
        salaryPerWeek,
        user_id } = req.body;
    if (!rating || !reviewType || !companyName) {
        return next(handleError(400, "Please provide all fields"));
    }
    try {
        const reviewData = await prisma.review.create({
            data: {
                rating,
                reviewType,
                role,
                companyName,
                responsibilities,
                feedback,
                hoursPerWeek,
                salaryPerWeek,
                user: {
                    connect: { id: user_id }
                }
            }
        });
        res.status(200).json({ message: "Review created", data: reviewData });

    } catch (error) {
        console.log("error creating review: ", error);
        next(handleError(500, error));
    }
}