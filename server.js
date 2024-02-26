import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import proxy from "express-http-proxy";

import CourseRoute from "./routes/CourseRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import PurchaseRoute from "./routes/PurchaseRoute.js";
import CartRoute from "./routes/CartRoute.js";
import ChapterRoute from "./routes/ChapterRoute.js";
import AttachmentRoute from "./routes/AttachmentRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import UserRoute from "./routes/UserRoute.js";
import CaptureRoute from "./routes/CaptureRoute.js";
import PointRoute from "./routes/PointRoute.js";
import VidiosRoute from "./routes/VidiosRoute.js";
import ToolRoute from "./routes/ToolRoute.js";
import InstrumentRoute from "./routes/IntrumentRoute.js";
import QuestionRoute from "./routes/QuestionChapterRoute.js";
import { verifyToken } from "./middleware/verifyToken.js";

dotenv.config();
const { PORT } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "to many requests",
});

const app = express();
// middleware

app.use(
  cors({
    origin: ["http://localhost:5173", "https://codewithyoga.com"],
  })
);
app.use(express.json());
app.use(helmet());

app.use(limiter);
app.use(CourseRoute);
app.use(CategoryRoute);
app.use(PurchaseRoute);
app.use(CartRoute);
app.use(ChapterRoute);
app.use(AttachmentRoute);
app.use(PaymentRoute);
app.use(UserRoute);
app.use(CaptureRoute);
app.use(PointRoute);
app.use(VidiosRoute);
app.use(ToolRoute);
app.use(InstrumentRoute);
app.use(QuestionRoute);

app.get("/test", verifyToken, (req, res) => {
  res.status(200).json(`hello I'm from port :` + PORT);
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
