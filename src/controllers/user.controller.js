import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, monthlyBudget } = req.body;

    // Basic validation to ensure required fields are present
    if (!name || !email || !monthlyBudget) {
      return res.status(400).json({
        success: false,
        message: "Name, email and monthly budget are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      monthlyBudget,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

//  Get user details by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user details",
    });
  }
};
