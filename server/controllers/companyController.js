import Comapny from "../models/Company.js";
import bcrypt, { compare } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateTokens.js";
import Job from "../models/Job.js";

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
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getCompanyData = async (req, res) => {};

export const postJob = async (req, res) => {
  const { title, description, location, level, salary } = req.body;
  if (!email || !password)
    return res.json({
      success: false,
      message: "make sure all the fields are filled",
    });

  try {
    const jobData = {
      title,
      description,
      location,
      level,
      salary,
    };

    const job = await Job.create(jobData);

    return res.json({
      success: true,
      jobDetails: {
        title: job.title,
        description: job.description,
        location: job.location,
        level: job.level,
        salary: job.salary,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCompanyJobApplicants = async (req, res) => {};
export const getCompanyPostedJobs = async (req, res) => {};
export const changeJobApplicationsStatus = async (req, res) => {};
export const changeVisiblity = async (req, res) => {};
