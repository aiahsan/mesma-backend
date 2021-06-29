"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  purchseAmt: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    //required: true,
  },
  wholeSaler: {
    type: String,
    //required: true,
  },
  Status: {
    type: String,
    //required: true,
  },
  registerDate: {
    type: Date,
    //required: true,
  },
  address: {
    type: [Schema["Types"].ObjectId],
    ref: "Address",
  },

});

const User = mongoose.model("User", userSchema, "users");

exports.User = User;
