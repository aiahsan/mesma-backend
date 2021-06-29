"use strict";

const status = require("statuses");
const { Article, User } = require("../models");
const mongoose = require("mongoose");

const gettingAllArticles = async (req, res) => {
    const {isAuthorized} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const articles = await Article.find({}).exec() ;

    return res.status(status("OK")).json({message: "Articles retrieved successfully.", articles: articles});
}

const gettingSingleArticle = async (req, res) => {
    const {isAuthorized} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const {articleId} = req.params ;

    const article = await Article.findById(articleId).exec() ;

    if (!article) {
        return res.status(status("BAD REQUEST")).json({ message: "Article does not exist." });
    }

    return res.status(status("OK")).json({message: "Article retrieved successfully.", article: article});
}

const addingNewArticle = async (req, res) => {
    const {isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const {name, description} = req.body;
    console.log(req.body,"req");
    if (!name) {
        return res.status(status("BAD REQUEST")).json({ message: "Article name not provided." });
    }
    if (!description) {
        return res.status(status("BAD REQUEST")).json({ message: "Article description not provided." });
    }

    await Article.create({ 
        _id: mongoose.Types.ObjectId(),
        name: name, 
        description: description,
        author: id
    })

    return res.status(status("CREATED")).json({ message: "Article added successfully." });
}

const updatingArticle = async (req, res) => {
    const {isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const {name, description} = req.body;
    const {articleId} = req.params ;
    console.log(articleId,"Ssss");
    const article = await Article.findById(articleId).exec();
    if (!article) {
        return res.status(status("BAD REQUEST")).json({ message: "Article does not exist." });
    }
    if (name) {
        article.name = name ;
    }
    if (description) {
        article.description = description;
    }

    await article.save();

    return res.status(status("OK")).json({ message: "Article updated successfully." });
}

const deletingArticle = async (req, res) => {
    const {isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const loginUser = await User.findById(id).exec();
    if (loginUser.role != "ADMIN") {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not an Administrator." });
    }

    const {articleId} = req.params ;
    const article = await Article.findById(articleId).exec() ;
    if (!article) {
        return res.status(status("BAD REQUEST")).json({ message: "Article does not exist." });
    }
    await Article.deleteOne(article);

    return res.status(status("OK")).json({ message: "Article deleted successfully." });
}
exports.gettingAllArticles = gettingAllArticles;
exports.gettingSingleArticle = gettingSingleArticle;
exports.addingNewArticle = addingNewArticle;
exports.updatingArticle = updatingArticle;
exports.deletingArticle = deletingArticle;