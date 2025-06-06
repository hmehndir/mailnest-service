import express from "express"; // react style
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";

dotenv.config({});
connectDB();
const PORT = 8080;
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "https://mailnest-ui.vercel.app", // your frontend
    credentials: true, // this is crucial for cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE"], // explicitly allow methods
    allowedHeaders: ["Content-Type", "Authorization"] // allow headers
  };
  
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

app.set("trust proxy", 1);

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});