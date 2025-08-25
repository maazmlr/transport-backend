


import ReviewService from "../services/review.js";



export const createReviewController = async (req, res) => {
  try {
    
    const { userId, rideId, rating, comment } = req.body;

    if (!userId || !rideId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const review = await ReviewService.createReview({
      userId,
      rideId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    console.error("createReviewController error:", err);
    res.status(500).json({ message: "Failed to add review" });
  }
};
