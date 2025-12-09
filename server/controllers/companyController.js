import Comapny from "../models/Company";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

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

    const salt = bcrypt.genSalt(10);
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
    });
  } catch (error) {}
};
export const loginCompany = async (req, res) => {};
export const getCompanyData = async (req, res) => {};
export const postJob = async (req, res) => {};
export const getCompanyJobApplicants = async (req, res) => {};
export const getCompanyPostedJobs = async (req, res) => {};
export const changeJobApplicationsStatus = async (req, res) => {};
export const changeVisiblity = async (req, res) => {};
