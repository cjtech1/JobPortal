import jwt from "jsonwebtoken";
import Comapny from "../models/Company.js";

export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      success: false,
      message: "Account not authorised, Login Again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = await Comapny.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
