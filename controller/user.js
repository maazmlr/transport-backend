import { UserServices } from "../services/user.js";
import { getUserById,getAllDrivers,updateDriverVerification } from "../models/user.js";
export const updateProfileController = async (req, res) => {
  try {
    const {
      id,
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
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedUser = await UserServices.updateProfile(id, {
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
      vehicleType, // ✅ Pass to service
      vehicleLimit, // ✅ Pass to service
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updateProfileController:", error);

    if (error.message === "Email already registered.") {
      return res.status(409).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: "Failed to update profile" });
  }
};



export async function getDriversController(req, res) {
  try {
    const drivers = await getAllDrivers();
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getUserByIdController(req, res) {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateDriverVerificationController(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid verification status" });
    }

    const updated = await updateDriverVerification(id, status);

    if (!updated.length) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
