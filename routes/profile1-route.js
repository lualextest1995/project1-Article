import express from "express";
const router = express();
import Post1 from "../models/post1-model.js";

const authCheck = (req, res, next) => {
  console.log(req.originalUrl);
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, async (req, res) => {
  let postFound = await Post1.find({ author: req.user._id });
  let sortPostFound = postFound.sort((a, b) => b.date - a.date);
  res.render("profile1.ejs", { user: req.user, posts: sortPostFound });
});

router.post("/post", authCheck, async (req, res) => {
  let { content } = req.body;
  let newPost = new Post1({ content, author: req.user._id });
  try {
    await newPost.save();
    res.status(200).render("/profile1");
  } catch (err) {
    req.flash("error_msg", "Content are required.");
    res.redirect("/profile1");
  }
});

router.get("/search", authCheck, async (req, res) => {
  let { content } = req.query;
  let answer = await Post1.find({});
  let data = [];
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].content.includes(content)) {
      data.push(answer[i]);
    }
  }
  res.render("search1.ejs", { user: req.user, datas: data, content });
});

router.post("/delete", authCheck, async (req, res) => {
  let { id } = req.body;
  let data = await Post1.find({ _id: id });
  await Post1.deleteOne({ _id: data[0]._id });
  res.redirect("/profile1");
});

export default router;
