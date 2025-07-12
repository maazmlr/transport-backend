import { UserServices } from "../services/user.js";

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
      vehicleType,       // ✅ NEW
      vehicleLimit       // ✅ NEW
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
      vehicleType,       // ✅ Pass to service
      vehicleLimit       // ✅ Pass to service
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
    return res.status(500).json({ message: "Failed to update profile" });
  }
};
