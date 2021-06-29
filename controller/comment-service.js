"use strict";

const status = require("statuses");
const { Comment, User } = require("../models");
const mongoose = require("mongoose");


const gettingUserComments = async (req, res) => {
    const {isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const comments = await Comment.find({author: id}).exec() ;

    return res.status(status("OK")).json({message: "User comments retrieved successfully.", comments: comments});
}

const gettingAllComments = async (req, res) => {
    const {isAuthorized} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const comments = await Comment.find({}).exec() ;

    return res.status(status("OK")).json({message: "Comments retrieved successfully.", comments: comments});
}

const postingUserComment = async (req, res) => {
    const {isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const {message, articleId} = req.body;

    if (!message) {
        return res.status(status("BAD REQUEST")).json({ message: "Comment message not provided" });
    }
    if (!articleId) {
        return res.status(status("BAD REQUEST")).json({ message: "The article is not found." });
    }

    await Comment.create({ 
        _id: mongoose.Types.ObjectId(),
        message: message, 
        article: articleId,
        author: id
    })

    return res.status(status("CREATED")).json({ message: "Comment added successfully" });
}

const deletingUserComment = async (req, res) => {
    const {isAuthorized, id} = req ;

    if (!isAuthorized) {
        return res.status(status("UNAUTHORIZED")).json({ message: "You are not allowed to perform this action." });
    }

    const {commentId} = req.params;

    const comment = await Comment.findById(commentId).exec();
    if (!comment) {
        return res.status(status("BAD REQUEST")).json({ message: "Comment does not exist." });
    }
    if (comment.author != id) {
        return res.status(status("BAD REQUEST")).json({ message: "You are not allowed to perform this action." });
    }
    const del = await Comment.deleteOne(comment) ;

    return res.status(status("OK")).json({ message: "Comment deleted successfully.", status: del });
}


exports.gettingUserComments = gettingUserComments;
exports.gettingAllComments = gettingAllComments;
exports.postingUserComment = postingUserComment;
exports.deletingUserComment = deletingUserComment;