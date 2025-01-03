
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
        location,
        currency,
        user_id } = req.body;
    if (!rating || !reviewType || !role || !companyName || !responsibilities ||
        !feedback || !hoursPerWeek || !salaryPerWeek || !location || !currency) {
        return next(handleError(400, "Please provide all fields"));
    }

    try {
        const reviewData = await prisma.review.create({
            data: {
                rating: Number(rating),
                reviewType,
                role,
                companyName,
                responsibilities,
                feedback,
                currency,
                location,
                hoursPerWeek: Number(hoursPerWeek),
                salaryPerWeek: String(salaryPerWeek),
                userId: user_id
            }
        });
        res.status(200).json({ message: "Review created", data: reviewData });

    } catch (error) {
        console.log("error creating review: ", error);
        next(handleError(500, error));
    }
}

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await prisma.review.findMany();
        res.status(200).json({ message: "All reviews", data: reviews });

    } catch (error) {
        console.log("error getting reviews: ", error);
        next(handleError(500, error));
    }
}

export const getReviewById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const review = await prisma.review.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json({ message: "Review", data: review });

    } catch (error) {
        console.log("error getting review: ", error);
        next(handleError(500, error));
    }
}


export const updateReview = async (req, res, next) => {
    const id = req.params.id;
    const {
        rating,
        reviewType,
        role,
        companyName,
        responsibilities,
        feedback,
        currency,
        location,
        hoursPerWeek,
        salaryPerWeek,
    } = req.body;
    if (!rating || !reviewType || !companyName) {
        return next(handleError(400, "Please provide all fields"));
    }
    try {
        const reviewData = await prisma.review.update({
            where: {
                id: String(id)
            },
            data: {
                rating,
                reviewType,
                role,
                companyName,
                responsibilities,
                feedback,
                currency,
                location,
                hoursPerWeek,
                salaryPerWeek,


            }
        });
        res.status(200).json({ message: "Review updated", data: reviewData });

    } catch (error) {
        console.log("error updating review: ", error);
        next(handleError(500, error));
    }
}

export const deleteReview = async (req, res, next) => {
    const id = req.params.id;
    try {
        await prisma.review.delete({
            where: {
                id: String(id)
            }
        });
        res.status(200).json({ message: "Review deleted" });

    } catch (error) {
        console.log("error deleting review: ", error);
        next(handleError(500, error));
    }
}