// models/ride.js (or queries/ride.js)
import db from "../src/db.js";

export const RideModel = {
  // Create new ride
  async create({
    userId,
    pickup,
    destination,
    price,
    status = "pending",
    rideDatetime,
    durationDays,
    requiredVehicleType,
  }) {
    try {
      const [ride] = await db("rides")
        .insert({
          user_id: userId,
          pickup,
          destination,
          price,
          status,
          ride_datetime: rideDatetime,
          duration_days: durationDays,
          required_vehicle_type: requiredVehicleType,
        })
        .returning([
          "id",
          "user_id",
          "pickup",
          "destination",
          "price",
          "ride_datetime",
          "duration_days",
          "required_vehicle_type",
          "status",
          "created_at",
        ]);

      return ride;
    } catch (error) {
      console.error("RideModel.create error:", error);
      throw error;
    }
  },

  // Get ride by ID
  async findById(rideId) {
    return db("rides").where({ id: rideId }).first();
  },

  // Get all rides by user
  async findByUser(userId) {
    return db("rides").where({ user_id: userId }).orderBy("created_at", "desc");
  },

  async findByDriver(driverId) {
    return db("rides")
      .where({ driver_id: driverId })
      .orderBy("created_at", "desc");
  },

  // Update ride status
  async updateStatus(rideId, status) {
    return db("rides")
      .where({ id: rideId })
      .update({ status, updated_at: new Date() });
  },

  async findRidesForDriver(driverId) {
    const driver = await db("users")
      .select("vehicleType")
      .where({ id: driverId, role: "driver" })
      .first();

    if (!driver?.vehicleType) return [];

    return db("rides")
      .where("required_vehicle_type", driver.vehicleType)
      .andWhere("status", "pending") // only pending rides
      .orderBy("created_at", "desc");
  },

  async assignDriverToRide(rideId, driverId) {
    const [ride] = await db("rides")
      .where({ id: rideId, status: "pending" }) // only allow if still pending
      .update({
        driver_id: driverId,
        status: "accepted",
        updated_at: new Date(),
      })
      .returning([
        "id",
        "user_id",
        "driver_id",
        "pickup",
        "destination",
        "price",
        "ride_datetime",
        "duration_days",
        "required_vehicle_type",
        "status",
        "created_at",
        "updated_at",
      ]);

    return ride;
  },
};
