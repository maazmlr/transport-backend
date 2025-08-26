import db from "../src/db.js";

export const UserServices = {
  async updateProfile(
    userId,
    {
      email,
      img_url,
      location,
      full_name,
      vehicle_info_url,
      vehicle_number,
      vehicle_model,
      license_url,
      license_number,
      license_valid,
      vehicleType, // ✅ NEW
      vehicleLimit, // ✅ NEW
    }
  ) {
    try {
      const existingUser = await db("users")
        .where({ email })
        .andWhereNot({ id: userId }) // make sure it's not the same user
        .first();

      if (existingUser) {
        throw new Error("Email already registered.");
      }
      // 1. Get user role from DB
      const user = await db("users")
        .select("role")
        .where({ id: userId })
        .first();

      const updateData = {
        email,
        img_url,
        location,
        full_name,
        updated_at: new Date(),
      };

      // 2. Conditionally add driver-only fields
      if (user?.role === "driver") {
        Object.assign(updateData, {
          vehicle_info_url,
          vehicle_number,
          vehicle_model,
          license_url,
          license_number,
          license_valid,
          vehicleType, // ✅ add vehicleType
          vehicleLimit, // ✅ add vehicleLimit
        });
      }

      const [updatedUser] = await db("users")
        .where({ id: userId })
        .update(updateData)
        .returning([
          "id",
          "email",
          "img_url",
          "location",
          "full_name",
          "role",
          "vehicle_info_url",
          "vehicle_number",
          "vehicle_model",
          "license_url",
          "license_number",
          "license_valid",
          "vehicleType", // ✅ return these fields
          "vehicleLimit", // ✅ return these fields
          "created_at",
          "updated_at",
        ]);

      return updatedUser;
    } catch (error) {
      console.error("Error in UserServices.updateProfile:", error);
      throw error;
    }
  },



 async  getDashboardStats() {
  const [riders, pending, active, resolved] = await Promise.all([
    db("users").where({ role: "driver" }).count("id as count").first(),
    db("users")
      .where({ role: "driver", driver_verification_status: "pending" })
      .count("id as count")
      .first(),
    db("tickets").where({ status: "open" }).count("id as count").first(),
    db("tickets")
      .where({ status: "closed" })
      .andWhereRaw("DATE(updated_at) = CURRENT_DATE")
      .count("id as count")
      .first(),
  ]);

  return {
    totalRiders: parseInt(riders.count, 10),
    pendingVerifications: parseInt(pending.count, 10),
    activeTickets: parseInt(active.count, 10),
    resolvedToday: parseInt(resolved.count, 10),
  };
}

};
