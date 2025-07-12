import { RideService } from "../services/ride.js";

export const createRideController = async (req, res) => {
  try {
    const {
      userId,
      pickup,
      destination,
      price,
      status = "pending",
      rideDatetime,
      durationDays,
      requiredVehicleType,
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !pickup ||
      !destination ||
      price == null ||
      !rideDatetime ||
      !durationDays ||
      !requiredVehicleType
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const ride = await RideService.createRide({
      userId,
      pickup,
      destination,
      price,
      status,
      rideDatetime,
      durationDays,
      requiredVehicleType,
    });

    res.status(201).json({ message: "Ride created", ride });
  } catch (err) {
    console.error("createRideController error:", err);
    res.status(500).json({ message: "Failed to create ride" });
  }
};

// controllers/rideController.js

export const getAvailableRidesController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Driver ID is required" });
    }

    const rides = await RideService.getAvailableRidesForDriver(id);

    res.status(200).json({
      message: "Available rides fetched successfully",
      rides,
    });
  } catch (error) {
    console.error("Error fetching available rides:", error);
    res.status(500).json({ message: "Failed to fetch rides" });
  }
};

// controllers/rideController.js
export const acceptRideController = async (req, res) => {
  try {
    const { rideId, driverId } = req.body;

    if (!rideId || !driverId) {
      return res
        .status(400)
        .json({ message: "rideId and driverId are required" });
    }

    const updatedRide = await RideService.assignDriverToRide(rideId, driverId);

    if (!updatedRide) {
      return res
        .status(404)
        .json({ message: "Ride not found or already accepted" });
    }

    return res.status(200).json({
      message: "Ride accepted successfully",
      ride: updatedRide,
    });
  } catch (error) {
    console.error("acceptRideController error:", error);
    return res.status(500).json({ message: "Failed to accept ride" });
  }
};
