// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import {
//   createCheckoutSession,
//   getAllPurchasedCourse,
//   getCourseDetailWithPurchaseStatus,
//   handleWebhook as cashfreeWebhook
// } from "../controllers/coursePurchase.controller.js";

// const router = express.Router();

// // Create checkout session
// router
//   .route("/checkout/create-checkout-session")
//   .post(isAuthenticated, createCheckoutSession);

// // Webhook route: needs raw body to verify Cashfree signature
// router
//   .route("/webhook")
//   .post(express.raw({ type: "application/json" }), cashfreeWebhook);

// // Get course detail with purchase status
// router
//   .route("/course/:courseId/detail-with-status")
//   .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

// // Get all purchased courses
// router
//   .route("/")
//   .get(isAuthenticated, getAllPurchasedCourse);

// export default router;

// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import {
//   createCheckoutSession,
//   getAllPurchasedCourse,
//   getCourseDetailWithPurchaseStatus,
//   cashfreeWebhook    // ✅ Ensure this matches your controller export
// } from "../controllers/coursePurchase.controller.js";

// const router = express.Router();

// // Create checkout session
// router.post(
//   "/checkout/create-checkout-session",
//   isAuthenticated,
//   express.json(),  // parse JSON body for createCheckout
//   createCheckoutSession
// );

// // Webhook route — use raw body to verify Cashfree signature
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),  // required for signature verification
//   cashfreeWebhook
// );

// // Get course detail with purchase status
// router.get(
//   "/course/:courseId/detail-with-status",
//   isAuthenticated,
//   getCourseDetailWithPurchaseStatus
// );

// // Get all purchased courses
// router.get("/", isAuthenticated, getAllPurchasedCourse);


// export default router;

// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import {
//   createCheckoutSession,
//   getAllPurchasedCourse,
//   getCourseDetailWithPurchaseStatus,
//   cashfreeWebhook
// } from "../controllers/coursePurchase.controller.js";

// const router = express.Router();

// // ✅ Create checkout session
// router.post(
//   "/checkout/create-checkout-session",
//   isAuthenticated,
//   express.json(),  // For parsing JSON request body
//   createCheckoutSession
// );

// // ✅ Webhook route from Cashfree (must be raw for signature verification)
// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),  // Do NOT use express.json() here
//   cashfreeWebhook
// );

// // ✅ Get course detail with purchase status (protected route)
// router.get(
//   "/course/:courseId/detail-with-status",
//   isAuthenticated,
//   getCourseDetailWithPurchaseStatus
// );

// // ✅ Get all purchased courses by user (protected route)
// router.get(
//   "/",
//   isAuthenticated,
//   getAllPurchasedCourse
// );

// export default router;

// //   https://ce37-27-5-45-30.ngrok-free.app -> http://localhost:8080 
// // https://e7a5-103-21-55-78.ngrok.io/api/v1/purchase/webhook
// // https://ce37-27-5-45-30.ngrok-free.app/api/v1/purchase/webhook

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { createCashfreeOrder } from "../controllers/coursePurchase.controller.js";
// import { createCheckoutSession, getAllPurchasedCourse, getCourseDetailWithPurchaseStatus, handleCashfreeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// router.post("/create-checkout-session", isAuthenticated, createCheckoutSession);
// router.post("/webhook", express.raw({ type: "application/json" }), cashfreeWebhook);
// router.post("/webhook", handleCashfreeWebhook);
// router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithPurchaseStatus);
// router.get("/", isAuthenticated, getAllPurchasedCourse);

import { createCashfreeOrder, verifyCashfreeOrder, getCourseDetailWithPurchaseStatus, getAllPurchasedCourse } from "../controllers/coursePurchase.controller.js";

router.post("/create-order", isAuthenticated, createCashfreeOrder);
router.get("/verify", isAuthenticated, verifyCashfreeOrder);
router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithPurchaseStatus);
router.get("/", isAuthenticated, getAllPurchasedCourse);


router.post("/create-order", createCashfreeOrder);


export default router;
