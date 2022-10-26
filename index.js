import express from "express";
const app = express();
import mongoose from "mongoose";
import ejs from "ejs";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import authRoute from "./routes/auth-route.js";
import profileRoute1 from "./routes/profile1-route.js";
import profileRoute2 from "./routes/profile2-route.js";
import profileRoute3 from "./routes/profile3-route.js";
import profileRoute4 from "./routes/profile4-route.js";
import("./config/passport.js");
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";

//Connect MongoDB Atlas
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to mongoDB Atlas.");
  })
  .catch((err) => {
    console.log("Connection Failed.");
    console.log(err);
  });

//moddleware
app.set("view engin", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
app.use("/auth", authRoute);
app.use("/profile1", profileRoute1);
app.use("/profile2", profileRoute2);
app.use("/profile3", profileRoute3);
app.use("/profile4", profileRoute4);

app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.user });
});

//預防亂打網址
app.get("/*", (req, res) => {
  res.status(404);
  res.render("err404.ejs");
});

//Error Handling
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).render("error.ejs");
});

app.listen(8080, () => {
  console.log("Server running on port 8080.");
});
