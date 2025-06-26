//  https://5b4f-27-5-47-96.ngrok-free.app/api/v1/purchase/webhook
//  https://d6e7-27-5-47-48.ngrok-free.app/api/v1/purchase/webhook

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  cashfreeWebhook,
  createCashfreeOrder,
  getCourseDetailWithPurchaseStatus,
  getAllPurchasedCourse
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createCashfreeOrder);
router.post("/webhook", cashfreeWebhook);
router.get("/course/:courseId/detail-with-status", isAuthenticated, getCourseDetailWithPurchaseStatus);
router.get("/", isAuthenticated, getAllPurchasedCourse);

export default router;
