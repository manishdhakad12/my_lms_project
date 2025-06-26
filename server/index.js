// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import courseRoute from "./routes/course.route.js";
// import mediaRoute from "./routes/media.route.js";
// import purchaseRoute from "./routes/purchaseCourse.route.js";
// import isAuthenticated from "./middlewares/isAuthenticated.js";

// dotenv.config({});
// connectDB();
// const app = express();

// const PORT = 8080;

// app.use(express.json());

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/v1/user", mediaRoute);
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/course", courseRoute);
// app.use("/api/v1/purchase", purchaseRoute);

// app.listen(PORT, () => {
//     console.log(`server listen at port ${PORT}`); 
    
// })


// export default app;

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

dotenv.config({});
connectDB();

const app = express();

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
  origin: "http://localhost:5173",
  credentials: true
}));
app.post("/api/v1/purchase/webhook", cashfreeWebhook);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.listen(8080, () => console.log("Server listening on port 8080"));
