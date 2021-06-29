"use strict";

const express = require("express");
const services = require("../controller");

const userRouter = express.Router();
// userRouter.post("/login", services.userService.login);// Admin/User
userRouter.post("/register", services.userService.register);// Admin/User
// userRouter.post("/logout", services.userService.loggingOut);// Admin/User
// userRouter.get("/", services.userService.gettingAllUsers); // Admin/User
// userRouter.post("/newUser", services.userService.postingNewUser); // Admin
// userRouter.put("/:userId", services.userService.updatingUser); // User
// userRouter.get("/userlogin", services.userService.gettingLoginUser); // User
// userRouter.delete("/:userId", services.userService.removingUser) ; // Admin


exports.userRouter = userRouter;

// const articleRouter = express.Router();
// articleRouter.get("/", services.articleService.gettingAllArticles);
// articleRouter.get("/:articleId", services.articleService.gettingSingleArticle);// Admin/User
// articleRouter.post("/", services.articleService.addingNewArticle);
// articleRouter.put("/:articleId", services.articleService.updatingArticle); // Admin/User
// articleRouter.delete("/:articleId", services.articleService.deletingArticle); // Admin


// exports.articleRouter = articleRouter;

// const commentRouter = express.Router();
// commentRouter.get("/usercomment", services.commentService.gettingUserComments); // Admin/User
// commentRouter.get("/", services.commentService.gettingAllComments); // Admin/User
// commentRouter.post("/usercomment", services.commentService.postingUserComment);// Admin/User
// commentRouter.delete("/usercomment/:commentId", services.commentService.deletingUserComment); // Admin/User


// exports.commentRouter = commentRouter;
