import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";

import reservationRoutes from "./src/routes/reservation";
import locationRoutes from "./src/routes/location";
import categoryRoutes from "./src/routes/category";
import authRoutes from "./src/routes/auth";
import rentRoutes from "./src/routes/rent";
import "./src/mongoose/schemas/user";
import "./src/auth/local-strategy";
import path from "path";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/location", locationRoutes);
app.use("/category", categoryRoutes);
app.use("/rent", rentRoutes);
app.use("/reservation", reservationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function connectToDB() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@momentcar.yyk5q.mongodb.net/?retryWrites=true&w=majority&appName=MomentCar`
  );
}
connectToDB()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));
