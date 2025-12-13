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
import { protectCompany } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", upload.single("image"), registerCompany);
router.post("/login", loginCompany);
router.get("/company", protectCompany, getCompanyData);
router.post("/post-job", protectCompany, postJob);
router.post("/applicants", protectCompany, getCompanyJobApplicants);
router.post("/list-jobs", protectCompany, getCompanyPostedJobs);
router.post("/change-status", protectCompany, changeJobApplicationsStatus);
router.post("/change-visibility", protectCompany, changeVisiblity);

export default router;
