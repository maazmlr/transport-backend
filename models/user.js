import db from "../src/db.js";

export async function getUserByPhone(phone) {
  return db("users").where({ phone_number: phone }).first();
}

export async function createUser(userData) {
  return db("users").insert(userData).returning("*");
}


export async function getAllDrivers() {
  return db("users").where({ role: "driver" ,driver_verification_status:"pending"});
}

export async function getUserById(userId) {
  return db("users").where({ id: userId }).first();
}

export async function updateDriverVerification(userId, status) {
  return db("users")
    .where({ id: userId, role: "driver" })
    .update({ driver_verification_status: status, updated_at: new Date() })
    .returning("*");
}
