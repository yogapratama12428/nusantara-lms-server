import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

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
import AuthRoute from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";

import { verifyToken } from "./middleware/verifyToken.js";

dotenv.config();
const { PORT } = process.env;

const app = express();

// middleware
app.use(express.json());

app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173", "https://codewithyoga.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(helmet());

//const allowlist = ['192.168.137.208', '13.126.192.186']

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    // skip: (req, res) => allowlist.includes(req.ip),
    // validate: {
    //   trustProxy: true,
    //   xForwardedForHeader: true,
    // },
    handler: function (req, res, next) {
      res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    },
  })
);

app.use(cookieParser());

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
app.use(AuthRoute);

app.get("/test", verifyToken, (req, res) => {
  res.status(200).json(`hello I'm from port :` + PORT);
});

try {
  app.listen(PORT, () => {
    console.log("listening on port " + PORT);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
