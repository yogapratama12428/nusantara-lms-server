import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import apicache from 'apicache'
import helmet from "helmet";

import CourseRoute from "./routes/CourseRoute.js"
import CategoryRoute from "./routes/CategoryRoute.js"
import PurchaseRoute from "./routes/PurchaseRoute.js"
import CartRoute from "./routes/CartRoute.js"
import ChapterRoute from "./routes/ChapterRoute.js"
import AttachmentRoute from "./routes/AttachmentRoute.js"
import PaymentRoute from "./routes/PaymentRoute.js"
import UserRoute from "./routes/UserRoute.js"
import CaptureRoute from "./routes/CaptureRoute.js"
import PointRoute from "./routes/PointRoute.js"
import VidiosRoute from "./routes/VidiosRoute.js"
import ToolRoute from "./routes/ToolRoute.js"
import InstrumentRoute from "./routes/IntrumentRoute.js"
import { verifyToken } from "./middleware/verifyToken.js";


dotenv.config();
const { PORT } = process.env;

const app = express();

const cache = apicache.middleware

// middleware
app.use(cors())
app.use(express.json());
app.use(helmet())
app.disable('x-powered-by')
app.use(cache('2 minutes'))

app.use(CourseRoute);
app.use(CategoryRoute);
app.use(PurchaseRoute);
app.use(CartRoute);
app.use(ChapterRoute);
app.use(AttachmentRoute);
app.use(PaymentRoute );
app.use(UserRoute);
app.use(CaptureRoute);
app.use(PointRoute);
app.use(VidiosRoute);
app.use(ToolRoute);
app.use(InstrumentRoute);

app.get('/test', verifyToken, (req, res) => {
  res.status(200).json(`hello I'm from port :` + PORT);
});


app.listen( PORT, () => {
    console.log('listening on port ' + PORT);
})








