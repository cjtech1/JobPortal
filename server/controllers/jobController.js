import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ visible: true }).populate({
      path: "companyId",
      select: "-password",
    });
    res.json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  const id = req.params.id;

  try {
    const jobs = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (jobs) {
      res.json({
        success: true,
        jobs,
      });
    } else {
      res.json({
        success: false,
        message: "Job Not Found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
