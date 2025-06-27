import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import { cashfreeWebhook } from "./controllers/coursePurchase.controller.js";
import path from "path";
import { match } from "path-to-regexp";

dotenv.config({});
connectDB();

const PORT = process.env.PORT || 8080;

const app = express();

const _dirname = path.resolve();

// app.use("/api/v1/purchase/webhook", express.raw({ type: "application/json" }));

app.use(
  express.json({
    limit: "2mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  })
);
app.use(cookieParser());

app.use(cors({
  origin: "https://my-lms-project-client-jyfh.onrender.com",
  credentials: true
}));
app.post("/api/v1/purchase/webhook", cashfreeWebhook);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.use(express.static(path.join(_dirname, "/client/dist")));
// app.get('/*', (req,res) => {
//     res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
// });

app.get(/^\/(?!api\/v1\/).*/, (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
});


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
