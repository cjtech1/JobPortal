import express from "express";
import {
  changeJobApplicationsStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany,
} from "../controllers/companyController.js";
import upload from "../config/multer.js";
const router = express.Router();

router.post("/register", upload.single('image'), registerCompany);
router.post("/login", loginCompany);
router.post("/company", getCompanyData);
router.post("/post-job", postJob);
router.post("/applicants", getCompanyJobApplicants);
router.post("/list-jobs", getCompanyPostedJobs);
router.post("/change-status", changeJobApplicationsStatus);
router.post("/change-visibility", changeVisiblity);

export default router;
