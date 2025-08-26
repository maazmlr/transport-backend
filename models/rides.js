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
  time, // add time here
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
        time, // insert time
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
        "time", // return time
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
  return db("rides as r")
    .leftJoin("users as u", "r.user_id", "u.id")       // rider info
    .leftJoin("users as d", "r.driver_id", "d.id")     // driver info
    .where("r.id", rideId)
    .first()
    .select(
      "r.*",
      "u.id as user_id",
      "u.full_name as user_name",

      "u.phone_number as user_phone",
      "u.email as user_email",
      "d.*"
    );
}
,

  // Get all rides by user
  async findByUser(userId) {
    return db("rides")
      .leftJoin("users as drivers", "rides.driver_id", "drivers.id")
      .select("rides.*", "drivers.phone_number as phone")
      .where("rides.user_id", userId)
      .orderBy("rides.created_at", "desc");
  },

  async findByDriver(driverId) {
    return db("rides")
      .leftJoin("users", "rides.user_id", "users.id")
      .select("rides.*", "users.phone_number as phone")
      .where("rides.driver_id", driverId)
      .orderBy("rides.created_at", "desc");
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

 async getAllRides() {
  return db("rides as r")
    .leftJoin("users as d", "r.driver_id", "d.id") // join driver info if exists
    .whereNotIn("r.status", ["cancelled", "completed"])
    .orderBy("r.created_at", "desc")
    .select(
      "r.*",
      "d.id as driver_id",
      "d.full_name as driver_name",
      "d.email as driver_email",
      "d.phone_number as driver_phone"
    );
}
}
