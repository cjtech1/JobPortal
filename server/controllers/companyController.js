import Comapny from "../models/Company.js";
import bcrypt, { compare } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateTokens.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile)
    return res.json({
      success: false,
      message: "All the fields should be filled",
    });

  try {
    const companyExist = await Comapny.findOne({ email });

    if (companyExist)
      return res.json({
        success: false,
        message: "Email Already Regsitered",
      });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    const companyData = {
      name,
      email,
      password: hashPassword,
      image: imageUpload.secure_url,
    };
    const company = await Comapny.create(companyData);

    res.json({
      success: true,
      message: "Registration Successfull",
      company: {
        _id: company.id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      token: generateToken(company.id),
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({
      success: false,
      message: "make sure all the fields are filled",
    });

  try {
    const companyExist = await Comapny.findOne({ email });
    if (companyExist) {
      const verified = await bcrypt.compare(password, companyExist.password);
      if (verified) {
        res.json({
          success: true,
          message: "Login Successfull",
          company: {
            _id: companyExist._id,
            name: companyExist.name,
            email: companyExist.email,
            image: companyExist.image,
          },
          token: generateToken(companyExist._id),
        });
      } else {
        res.json({
          success: false,
          message: "Check Email or Password is correct",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Check Email or Password is correct",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyData = async (req, res) => {
  const company = req.company;
  if (!company) {
    return res.json({
      success: false,
      message: "Invalid details Login again",
    });
  }

  try {
    const companyData = await Comapny.findById(company);
    if (companyData) {
      return res.json({
        success: true,
        companyData,
      });
    } else {
      return res.json({
        success: false,
        message: "Unable to find company",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const postJob = async (req, res) => {
  const { title, description, location, level, salary, category } = req.body;
  if (!title || !description || !location || !level || !salary || !category)
    return res.json({
      success: false,
      message: "make sure all the fields are filled",
    });

  try {
    const jobData = new Job({
      companyId: req.company._id,
      title,
      description,
      category,
      location,
      level,
      salary,
      date: Date.now(),
    });

    await jobData.save();
    res.json({ success: true, jobData });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyJobApplicants = async (req, res) => {};

export const getCompanyPostedJobs = async (req, res) => {
  const company = req.company;
  if (!company) {
    return res.json({
      success: false,
      message: "Invalid details Login again",
    });
  }

  try {
    const companyJobs = await Job.find({ companyId: company._id });

    const jobsData = await Promise.all(
      companyJobs.map(async (job) => {
        const applicants = await JobApplication.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );

    return res.json({
      success: true,
      jobsData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
export const changeJobApplicationsStatus = async (req, res) => {};

export const changeVisiblity = async (req, res) => {
  try {
    const jobId = req.body.id;
    const company = req.company;
    if (!jobId) {
      return res.json({
        success: false,
        message: "Invalid job details, try again",
      });
    }

    const jobData = await Job.findOne({ _id: jobId });
    if (jobData.companyId.toString() === company._id.toString()) {
      jobData.visible = !jobData.visible;
      await jobData.save();
      return res.json({
        success: true,
        message: "Updated Successfully",
        jobData,
      });
    } else {
      return res.json({
        success: false,
        message: "Unauthorised to modify job details",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
