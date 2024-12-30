import express from 'express';

import { createReview, getReviews, getReviewById, updateReview, deleteReview } from '../controller/review.controller.js';

const router = express.Router();
router.post('/create', createReview);
router.get('/getReviews', getReviews);
router.get('/getReviewById/:id', getReviewById);
router.put('/updateReview/:id', updateReview);
router.delete('/deleteReview/:id', deleteReview);


export default router;