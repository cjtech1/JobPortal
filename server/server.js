import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import companyRoutes from "./route/companyRoutes.js";
import jobRoutes from "./route/jobRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRoutes from "./route/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";

//init express
const app = express();

//connect to db
await connectDB();

//connect Cloudinary
await connectCloudinary();

//middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

//test Route
/*
app.get("/", (req, res) => {
  res.send("API WORKING");
});
*/

//routes
app.post("/webhooks", clerkWebhooks);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Sentry Test Route
/*app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
*/

//port
const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
