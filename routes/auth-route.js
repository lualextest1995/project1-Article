import express from "express";
const router = express();
import passport from "passport";
import bcrypt from "bcrypt";
import User from "../models/user-model.js";

router.get("/login", (req, res) => {
  res.render("login.ejs", { user: req.user });
});

router.get("/signup", (req, res) => {
  res.render("signup.ejs", { user: req.user });
});

router.post("/signup", async (req, res) => {
  let { lastname, firstname, email, password } = req.body;
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    req.flash("error_msg", "這個信箱已有人使用，請試試其他的。");
    return res.redirect("/auth/signup");
  }

  const hash = await bcrypt.hash(password, 10);
  password = hash;
  let newUser = new User({ lastname, firstname, email, password });
  try {
    await newUser.save();
    req.flash("success_msg", "註冊成功！！");
    res.redirect("/auth/login");
  } catch (err) {
    req.flash("error_msg", err.errors.name.properties.message);
    res.redirect("/auth/signup");
  }
});

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: "電子郵件或密碼有誤。",
  }),
  (req, res) => {
    if (req.session.returnTo) {
      let newPath = req.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath);
    } else {
      res.redirect("/profile1");
    }
  }
);

export default router;
