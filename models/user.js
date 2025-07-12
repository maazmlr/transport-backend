import db from "../src/db.js";

export async function getUserByPhone(phone) {
  return db("users").where({ phone_number: phone }).first();
}

export async function createUser(userData) {
  return db("users").insert(userData).returning("*");
}
