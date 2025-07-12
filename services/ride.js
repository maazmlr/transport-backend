import { RideModel } from "../models/rides.js";

export const RideService = {
  async createRide(data) {
    return await RideModel.create(data);
  },

  async getRide(rideId) {
    return await RideModel.findById(rideId);
  },

  async getUserRides(userId) {
    return await RideModel.findByUser(userId);
  },

  async changeRideStatus(rideId, newStatus) {
    return await RideModel.updateStatus(rideId, newStatus);
  },

  async getAvailableRidesForDriver(driverId) {
    return RideModel.findRidesForDriver(driverId);
  },

  assignDriverToRide: RideModel.assignDriverToRide,
};
