// import { Cashfree } from "cashfree-pg"; // correct import

// // Initialize the Cashfree client with environment and credentials
// const cf = new Cashfree(
//   Cashfree.SANDBOX,                        // Sandbox mode (use Cashfree.PRODUCTION later)
//   process.env.CASHFREE_API_ID,             // X‑Client‑Id
//   process.env.CASHFREE_SECRET_KEY          // X‑Client‑Secret
// );
// // import express from 'express';
// // import crypto from 'crypto';
// // import { Cashfree } from 'cashfree-pg';
// // import CashfreePG from "cashfree-pg";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { Lecture } from "../models/lecture.model.js";
// import { User } from "../models/user.model.js";

// // const { Cashfree } = CashfreePG;

// // Configure Cashfree
// // Cashfree.XClientId = process.env.CASHFREE_API_ID;
// // Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
// // Cashfree.XEnvironment = CashfreePG.CashfreeEnvironment.SANDBOX;

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found!" });

//     const purchase = new CoursePurchase({
//       courseId,
//       userId,
//       amount: course.coursePrice,
//       status: "pending"
//     });
//     await purchase.save();

//     const orderReq = {
//       order_id: `course_${courseId}_${Date.now()}`,
//       order_amount: course.coursePrice,
//       order_currency: "INR",
//       customer_details: {
//         customer_id: userId,
//         customer_email: req.user.email,
//         customer_phone: req.user.phone,
//       },
//       order_meta: {
//         // return_url: `https://your-lms.com/course-progress/${courseId}?purchase=${purchase._id}`,
//         // notify_url: `https://your-lms.com/api/v1/purchase/webhook`
//         return_url: `http://localhost:5173/course-progress/${courseId}`,
//         notify_url: `http://localhost:5173/course-progress/${courseId}`
//       }
//     };

//     const { data } = await cf.PGCreateOrder("2025-01-01", orderReq);
//     purchase.paymentSessionId = data.payment_session_id;
//     purchase.cfOrderId = data.order_id;
//     purchase.paymentId = data.payment_session_id; // ✅ Add this line if paymentId = sessionId
//     await purchase.save();

//     res.status(200).json({ success: true, sessionId: data.payment_session_id });
//   } catch (error) {
//     // console.error(error);
//     // res.status(500).json({ message: "Server error" });

//     console.error("Cashfree CreateOrder error:", error.response?.data || error.message);
//     return res.status(500).json({ message: "Server error", details: error.response?.data });
//   }
// };

// import { Cashfree } from "cashfree-pg";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { User } from "../models/user.model.js";
// import dotenv from "dotenv";
// dotenv.config();

// // Initialize Cashfree client
// const cf = new Cashfree(
//   Cashfree.SANDBOX,
//   process.env.CASHFREE_API_ID,
//   process.env.CASHFREE_SECRET_KEY
// );

// export const createCheckoutSession = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { courseId } = req.body;

//     const user = await User.findById(userId);
//     const course = await Course.findById(courseId);

//     if (!user || !course)
//       return res.status(404).json({ message: "User or Course not found" });

//     const purchase = new CoursePurchase({
//       courseId,
//       userId,
//       amount: course.coursePrice,
//       status: "pending",
//     });
//     await purchase.save();

//     const orderReq = {
//       order_id: `order_${Date.now()}`,
//       order_amount: Number(course.coursePrice),
//       order_currency: "INR",
//       customer_details: {
//         customer_id: String(user._id),
//         customer_email: user.email,
//         customer_phone: user.phone || "9999999999",
//       },
//       order_meta: {
//         return_url: `http://localhost:5173/course-progress/${courseId}`,
//         notify_url: `https://ce37-27-5-45-30.ngrok-free.app/api/v1/purchase/webhook`
//       }
//     };

//     console.log("Sending to Cashfree:", orderReq); // ✅ log and verify

//     // const { data } = await cf.PGCreateOrder("2025-01-01", orderReq);
//     const { data } = await cf.PGCreateOrder(orderReq);

//     purchase.paymentSessionId = data.payment_session_id;
//     purchase.cfOrderId = data.order_id;
//     await purchase.save();

//     res.status(200).json({ success: true, sessionId: data.payment_session_id });
//   } catch (error) {
//     console.error("Cashfree CreateOrder error:", error.response?.data || error.message);
//     res.status(500).json({ message: "Cashfree error", details: error.response?.data });
//   }
// };

// import { Cashfree } from "cashfree-pg";
// import dotenv from "dotenv";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { User } from "../models/user.model.js";
// dotenv.config();

// // const cf = new Cashfree(
// //   Cashfree.SANDBOX,
// //   process.env.CASHFREE_API_ID,
// //   process.env.CASHFREE_SECRET_KEY
// // );

// // import { Cashfree } from "cashfree-pg";

// const cf = new Cashfree({
//   environment: "SANDBOX",
//   appId: process.env.CASHFREE_API_ID,
//   secretKey: process.env.CASHFREE_SECRET_KEY,
// });

// // const cf = new Cashfree.CFEnvironment.CFEnvironment({
// //    Cashfree.SANDBOX,
// //   process.env.CASHFREE_API_ID,
// //   process.env.CASHFREE_SECRET_KEY
// // });
// // const cf = new Cashfree({
// //   environment: "SANDBOX", // or "PRODUCTION"
// //   appId: process.env.CASHFREE_API_ID,
// //   secretKey: process.env.CASHFREE_SECRET_KEY,
// // });

// // import Cashfree from "cashfree-pg";
// // import CashfreeSDK from "cashfree-sdk";
// // const CashfreeSDK = require("cashfree-sdk");


// // const cf = new CashfreeSDK.Cashfree(
// //   CashfreeSDK.Cashfree.SANDBOX,
// //   process.env.CASHFREE_API_ID,
// //   process.env.CASHFREE_SECRET_KEY
// // );



// export const createCheckoutSession = async (req, res) => {
//   try {
//     console.log("Incoming body:", req.body, "userId:", req.id);

//     const userId = req.id;
//     const courseId = req.body.courseId;
//     if (!courseId) return res.status(400).json({ message: "courseId missing" });

//     const user = await User.findById(userId);
//     const course = await Course.findById(courseId);
//     if (!user || !course) return res.status(404).json({ message: "User or Course not found" });

//     const purchase = new CoursePurchase({ courseId, userId, amount: course.coursePrice, status: "pending" });
//     await purchase.save();

//     const order_id = `order_${Date.now()}`;
//     const orderReq = {
//       order_id,
//       order_amount: Number(course.coursePrice),
//       order_currency: "INR",
//       customer_details: {
//         customer_id: String(user._id),
//         customer_email: user.email,
//         customer_phone: user.phone || "9999999999"
//       },
//       order_meta: {
//         return_url: `http://localhost:5173/course-progress/${courseId}`,
//         notify_url: `https://ce37-27-5-45-30.ngrok-free.app/api/v1/purchase/webhook`
//       }
//     };

//     const result = await cf.PG.orders.create({
//   order_id,
//   order_amount: 299,
//   order_currency: "INR",
//   customer_details: {
//     customer_id: userId,
//     customer_email: email,
//     customer_phone: phone
//   },
//   order_meta: {
//     return_url: `http://localhost:5173/course-progress/${courseId}`,
//     notify_url: `https://ce37-27-5-45-30.ngrok-free.app/api/v1/purchase/webhook`
//   },
//   order_tags: {
//     userId: userId,
//     courseId: courseId
//   }
// });



//     console.log("Sending to Cashfree:", orderReq);
//     // const { data } = await cf.PGCreateOrder(orderReq);
//     const { data } = await cf.PG.orders.create(orderReq);


//     purchase.paymentSessionId = data.payment_session_id;
//     purchase.cfOrderId = data.order_id;
//     await purchase.save();
//     const response = await cf.orders.create(orderReq);

//    console.log("response", response);

//     // res.status(200).json({ success: true, paymentLink: data.payment_link });
//     res.status(200).json({
//       success: true,
//       paymentLink: response.payment_link,
//     });
//   } catch (err) {
//     console.error("checkout error:", err.response?.data || err);
//     res.status(500).json({ message: "Checkout session failed", error: err.response?.data || err.message });
//   }
// };




// // 2️⃣ Webhook handler: similar logic to Stripe, now for Cashfree
// // export const cashfreeWebhook = async (req, res) => {
// //   try {
// //     const event = req.body;
// //     if (event.event === "ORDER_PAID") {
// //       const { order } = event.data;
// //       const purchase = await CoursePurchase.findOne({ cfOrderId: order.order_id }).populate("courseId");
// //       if (purchase) {
// //         purchase.status = "completed";
// //         purchase.amount = order.order_amount;
// //         await purchase.save();

// //         if (purchase.courseId.lectures?.length) {
// //           await Lecture.updateMany(
// //             { _id: { $in: purchase.courseId.lectures } },
// //             { $set: { isPreviewFree: true } }
// //           );
// //         }

// //         await User.findByIdAndUpdate(purchase.userId, {
// //           $addToSet: { enrolledCourses: purchase.courseId._id }
// //         });
// //         await Course.findByIdAndUpdate(purchase.courseId._id, {
// //           $addToSet: { enrolledStudents: purchase.userId }
// //         });
// //       }
// //     }
// //     res.status(200).end();
// //   } catch (error) {
// //     console.error("Webhook processing error:", error);
// //     res.status(500).end();
// //   }
// // };

// export const handleCashfreeWebhook = async (req, res) => {
//   try {
//     const { order_id, order_status, customer_details, order_tags } = req.body;

//     if (order_status === "PAID") {
//       const userId = order_tags?.userId;
//       const courseId = order_tags?.courseId;

//       if (!userId || !courseId) {
//         return res.status(400).json({ success: false, message: "Missing courseId or userId in webhook" });
//       }

//       // ✅ Add course to user's purchasedCourses
//       const user = await User.findById(userId);
//       const course = await Course.findById(courseId);

//       if (!user || !course) {
//         return res.status(404).json({ success: false, message: "User or Course not found" });
//       }

//       // Add course if not already purchased
//       if (!user.purchasedCourses.includes(courseId)) {
//         user.purchasedCourses.push(courseId);
//         await user.save();
//       }

//       return res.status(200).json({ success: true });
//     }

//     return res.status(200).json({ success: false, message: "Payment not completed" });
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // 3️⃣ Course detail with purchase status (unchanged logic)
// export const getCourseDetailWithPurchaseStatus = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const userId = req.id;

//     const course = await Course.findById(courseId)
//       .populate({ path: "creator" })
//       .populate({ path: "lectures" });

//     if (!course) {
//       return res.status(404).json({ message: "Course not found!" });
//     }

//     const purchased = await CoursePurchase.findOne({ userId, courseId });
//     return res.status(200).json({
//       course,
//       purchased: !!purchased
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 4️⃣ Get all purchased courses (unchanged logic)
// export const getAllPurchasedCourse = async (req, res) => {
//   try {
//     const purchasedCourse = await CoursePurchase.find({ status: "completed" }).populate("courseId");
//     return res.status(200).json({ purchasedCourse: purchasedCourse || [] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };





// Top of file
// import fetch from "node-fetch";
// import { Course } from "../models/course.model.js";
// import { CoursePurchase } from "../models/coursePurchase.model.js";
// import { Lecture } from "../models/lecture.model.js";
// import { User } from "../models/user.model.js";
// import { getCashfreeToken } from "../utils/getCashfreeToken.js";

// import fetch from "node-fetch";
// import { Course, CoursePurchase, Lecture, User } from "../models";

// export const createCashfreeOrder = async (req, res) => {
//   try {
//     const userId = req.id;
//     if (!userId) return res.status(401).json({ success: false, message: "Unauthenticated" });
//     const course = await Course.findById(req.body.courseId);
//     if (!course) return res.status(404).json({ success: false, message: "Course not found" });

//     const newPurchase = await CoursePurchase.create({
//       courseId: course._id,
//       userId,
//       amount: course.coursePrice,
//       status: "pending",
//     });

//     const payload = {
//       order_id: newPurchase._id.toString(),
//       order_amount: course.coursePrice,
//       order_currency: "INR",
//       customer_details: {
//         customer_id: userId.toString(),
//         customer_email: req.user?.email || "",
//         customer_phone: req.user?.phone || "",
//       },
//       order_meta: {
//         return_url: `http://localhost:5173/course-progress/${course._id}?order_id=${newPurchase._id}`,
//       },
//     };

//     const cfRes = await fetch("https://sandbox.cashfree.com/pg/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-client-id": process.env.CASHFREE_API_ID,
//         "x-client-secret": process.env.CASHFREE_SECRET_KEY,
//         "x-api-version": "2025-01-01",
//       },
//       body: JSON.stringify(payload),
//     });

//     const cfData = await cfRes.json();
//     if (!cfRes.ok) throw new Error(cfData.message || "Order creation failed");

//     newPurchase.paymentId = cfData.cf_order_id;
//     await newPurchase.save();

//     return res.json({ success: true, paymentLink: cfData.payment_link });
//   } catch (err) {
//     console.error("Cashfree order error:", err);
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };

// import fetch from "node-fetch";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";

export const createCashfreeOrder = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const course = await Course.findById(req.body.courseId);
    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    const newPurchase = await CoursePurchase.create({
      courseId: course._id,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const payload = {
      order_id: newPurchase._id.toString(),
      order_amount: course.coursePrice,
      order_currency: "INR",
      customer_details: {
        customer_id: userId.toString(),
        customer_email: req.user?.email || "",
        customer_phone: req.user?.phone || "9876543210"
      },
      order_meta: {
        return_url: `http://localhost:5173/course-progress/${course._id}?order_id=${newPurchase._id}`,
      },
    };

    const cfRes = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-client-id": process.env.CASHFREE_API_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2025-01-01",
      },
      body: JSON.stringify(payload),
    });

    const cfData = await cfRes.json();
    console.log("Cashfree response status:", cfRes.status, cfData);
    // if (!cfRes.ok) throw new Error(cfData.message || "Order creation failed");

    // newPurchase.paymentId = cfData.cf_order_id;
    // await newPurchase.save();

    // return res.status(200).json({ success: true, paymentLink: cfData.payment_link });

    if (!cfRes.ok || !cfData.payment_session_id) {
      throw new Error(cfData.message || "Order creation failed");
    }
    newPurchase.paymentId = cfData.cf_order_id;
    await newPurchase.save();

    return res.json({
      success: true,
      paymentSessionId: cfData.payment_session_id
    });
  } catch (err) {
    console.error("Cashfree order error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const verifyCashfreeOrder = async (req, res) => {
  try {
    const { order_id } = req.query;
    const purchase = await CoursePurchase.findById(order_id).populate("courseId");
    if (!purchase) return res.redirect("/");

    if (purchase.status !== "completed") {
      purchase.status = "completed";
      if (purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }
      await purchase.save();

      // Update User & Course
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } }
      );
      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } }
      );
    }

    return res.redirect(`/course-progress/${purchase.courseId._id}`);
  } catch (err) {
    console.error("verifyCashfreeOrder error:", err);
    return res.redirect("/");
  }
};
export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    console.log(purchased);

    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      course,
      purchased: !!purchased, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};