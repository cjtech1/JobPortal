import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import User from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

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

export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.findOne({
      jobId,
      userId,
    });

    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "Job Already Applied",
      });
    }

    const companyId = Job.findOne(
      { _id: jobId },
      {
        companyId: 1,
        _id: 0,
      }
    );

    if (!companyId) {
      return res.json({
        success: false,
        message: "Job details not found",
      });
    }

    const jobApplication = await JobApplication.create({
      userId,
      companyId,
      jobId,
      date: Date.now(),
    });

    return res.json({
      success: true,
      message: "Application Successfull",
      jobApplication,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserJobApplications = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const appliedJobs = await JobApplication.find({
      userId,
    })
      .populate("companyId", "name email image")
      .populate("jobId", "title location")
      .exec();

    if (!appliedJobs) {
      return res.json({
        success: false,
        message: "No applied jobs found",
      });
    }
    return res.json({
      success: true,
      message: "Job Applications Found",
      appliedJobs,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserResume = async (req, res) => {
  const { userId } = req.auth.userId;
  const resumeFile = req.file;

  if (!resumeFile) {
    return res.json({
      success: false,
      message: "Please upload resume",
    });
  }

  try {
    const userData = await User.findById(userId);
    if (!userData) {
      return res.json({
        success: false,
        message: "User Data not Found",
      });
    }
    const resumeUpload = await cloudinary.uploader.upload(resumeFile.path);
    userData.resume = resumeUpload.secure_url;
    await userData.save();

    return res.json({
      success: true,
      message: "Upload Successful",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
