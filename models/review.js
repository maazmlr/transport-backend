// models/ReviewModel.js

import db from "../src/db.js";

class ReviewModel {
  async create({ userId, rideId, rating, comment }) {
    const [review] = await db("ride_reviews")
      .insert({
        user_id: userId,
        ride_id: rideId,
        rating,
        comment,
      })
      .returning(["id", "user_id", "ride_id", "rating", "comment", "created_at"]);

    return review;
  }

  async findByRide(rideId) {
    return db("ride_reviews")
      .where({ ride_id: rideId })
      .select("id", "user_id", "ride_id", "rating", "comment", "created_at");
  }

  async findByUser(userId) {
    return db("ride_reviews")
      .where({ user_id: userId })
      .select("id", "user_id", "ride_id", "rating", "comment", "created_at");
  }
}

export default new ReviewModel();
