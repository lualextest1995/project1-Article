import express from "express";
const router = express();
import Post2 from "../models/post2-model.js";

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
  let postFound = await Post2.find({ author: req.user._id });
  let sortPostFound = postFound.sort((a, b) => b.date - a.date);
  res.render("profile2.ejs", { user: req.user, posts: sortPostFound });
});

router.post("/post", authCheck, async (req, res) => {
  let { content } = req.body;
  let newPost = new Post2({ content, author: req.user._id });
  try {
    await newPost.save();
    res.status(200).render("/profile2");
  } catch (err) {
    req.flash("error_msg", "Both title and content are required.");
    res.redirect("/profile2");
  }
});

router.get("/search", authCheck, async (req, res) => {
  let { content } = req.query;
  let answer = await Post2.find({});
  let data = [];
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].content.includes(content)) {
      data.push(answer[i]);
    }
  }
  res.render("search2.ejs", { user: req.user, datas: data, content });
});

router.post("/delete", authCheck, async (req, res) => {
  let { id } = req.body;
  let data = await Post2.find({ _id: id });
  await Post2.deleteOne({ _id: data[0]._id });
  res.redirect("/profile2");
});

export default router;
