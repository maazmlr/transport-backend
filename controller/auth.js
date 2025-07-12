import { AuthServices } from "../services/auth.js";

export async function registerController(req, res) {
  const { phone, password, role = "user" } = req.body;

  // Optional: enforce allowed roles
  const allowedRoles = ["driver", "user"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: "Invalid role. Allowed roles are 'driver' or 'rider'.",
    });
  }

  try {
    const user = await AuthServices.register({ phone, password, role });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

export const loginController = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        message: "Phone and password are required",
      });
    }

    const user = await AuthServices.login({ phone, password });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(401).json({
      message: error.message || "Login failed",
    });
  }
};
