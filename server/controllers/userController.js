import User from "../models/User";

export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const userData = await User.findById(userId);
    if (!userData) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }
    return res.json({
      success: true,
      userData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const applyForJob = async (req, res) => {};
export const getUserJobApplications = async (req, res) => {};
export const updateUserResume = async (req, res) => {};
