import { Webhook } from "svix";
import User from "../models/User.js";
import mongoose from "mongoose";

// Function to manage clerk  user with DB

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRETS);

    //verification
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    //getting data from request body

    const { data, type } = req.body;

    //CASE for different events(types)
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          resume: "",
          image: data.image_url,
        };

        await User.create(userData);
        res.json({ success: "true", message: "user deleted" });
        break;
      }

      case "user.updated": {
        const userData = {
          name: data.first_name + " " + data.last_name,
          email: data.email_addresses[0].email_address,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({ success: "true", message: "user updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ success: "true", message: "user deleted" });
        break;
      }

      default:
        break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({
      success: "false",
      message: "webhooks error",
    });
  }
};
