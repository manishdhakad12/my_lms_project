import crypto from 'crypto';
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

export const cashfreeWebhook = async (req, res) => {
  console.log("👉 Webhook hit");

  const ts = req.headers["x-webhook-timestamp"];
  const sig = req.headers["x-webhook-signature"];
  const raw = req.rawBody;
  // const raw = req.body.toString("utf8");

  const expected = crypto
    .createHmac("sha256", process.env.CASHFREE_SECRET_KEY)
    .update(ts + raw)
    .digest("base64");

  console.log({ ts, expected, actual: sig });

  if (sig !== expected) {
    console.error("Invalid signature");
    return res.sendStatus(400);
  }

  let event;
  try { event = JSON.parse(raw); }
  catch (err) {
    console.error("Invalid JSON", err);
    return res.sendStatus(400);
  }

  // ✅ Handle test payload gracefully
  if (event.type === "WEBHOOK" && event.data?.test_object) {
    console.log("✔️ Test webhook received; acknowledging");
    return res.sendStatus(200);
  }

  // Now handle payment events
  const data = event.data || {};
  const orderId = data.order?.order_id || data.order_id;
  const paymentStatus = data.payment?.payment_status || data.payment_status;
  const cfPaymentId = data.payment?.cf_payment_id;

  if (!orderId || !paymentStatus) {
    console.error("Invalid event data", { orderId, paymentStatus });
    return res.sendStatus(400);
  }

  // Process real payment
  console.log("Processing purchase", { orderId, paymentStatus, cfPaymentId });
  const purchase = await CoursePurchase.findById(orderId).populate("courseId");
  if (!purchase) {
    console.error("Purchase not found:", orderId);
    return res.sendStatus(404);
  }

  if (purchase.status === "pending") {
    purchase.status = paymentStatus === "SUCCESS" ? "completed" : "failed";
    purchase.paymentId = cfPaymentId;
    await purchase.save();

    console.log("✅ Purchase updated:", purchase.status);

    if (purchase.status === "completed") {
      // unlock and enroll logic...
      console.log("🔓 Course unlocked for user", purchase.userId);

      await User.findByIdAndUpdate(
  purchase.userId,
  { $addToSet: { enrolledCourses: purchase.courseId._id } }
);

// ✅ Add user to course's enrolledStudents
await Course.findByIdAndUpdate(
  purchase.courseId._id,
  { $addToSet: { enrolledStudents: purchase.userId } }
);

console.log("✅ User and course updated with enrollment");
    }
    
  } else {
    console.log("Purchase already processed:", purchase.status);
  }

  return res.sendStatus(200);
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId });
    return res.status(200).json({
      course,
      purchased: !!purchased
    });
  } catch (error) {
    console.error("getCourseDetail error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");

    return res.status(200).json({
      purchasedCourse: purchasedCourse || []
    });
  } catch (error) {
    console.error("getAllPurchasedCourse error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};