import { getUserByPhone, createUser } from "../models/user.js";

export const AuthServices = {
  async register({ phone, password, role = "rider" }) {
    try {
      // 1. Check if user already exists
      const existingUser = await getUserByPhone(phone);
      if (existingUser) {
        throw new Error("Phone number already registered");
      }

      // 2. Hash the password (RECOMMENDED — replace with bcrypt in prod)
      // const hashedPassword = await bcrypt.hash(password, 10);
      const hashedPassword = password; // Replace this with real hashing

      // 3. Insert the new user
      const [user] = await createUser({
        phone_number: phone,
        password: hashedPassword,
        role,
      });

      // 4. Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error in AuthServices.register:", error);
      throw error;
    }
  },

  async login({ phone, password }) {
    try {
      // 1. Fetch user by phone
      const user = await getUserByPhone(phone);
      if (!user) {
        throw new Error("Invalid phone number or password");
      }

      // 2. Compare password (RECOMMENDED: use bcrypt in prod)
      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        throw new Error("Invalid phone number or password");
      }

      // 3. Remove password before returning
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error("Error in AuthServices.login:", error);
      throw error;
    }
  },

  async updatePassword({ userId, oldPassword, newPassword }) {
    try {
      const user = await db("users").where({ id: userId }).first();
      if (!user) {
        throw new Error("User not found");
      }

      if (user.password !== oldPassword) {
        throw new Error("Old password is incorrect");
      }

      await db("users").where({ id: userId }).update({ password: newPassword });

      return { message: "Password updated successfully" };
    } catch (error) {
      console.error("Error in AuthService.updatePassword:", error);
      throw error;
    }
  },
};
