// services/ReviewService.js
import ReviewModel from "../models/review.js";

class ReviewService {
  async createReview(data) {
    return await ReviewModel.create(data);
  }

  async getReviewsByRide(rideId) {
    return await ReviewModel.findByRide(rideId);
  }

  async getReviewsByUser(userId) {
    return await ReviewModel.findByUser(userId);
  }
}

export default new ReviewService();
