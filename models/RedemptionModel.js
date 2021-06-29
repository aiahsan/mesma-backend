"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const redemptionSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  rdmptType: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema["Types"].ObjectId,
    ref: "User",
  }, 
  item: {
    type: String,
    required: true,
  },
  confirmNumber: {
    type: String,
    required: true,
  },
  address: {
    type: Schema["Types"].ObjectId,
    ref: "Address",
  }, 
  bookingDetails: {
    type: Schema["Types"].ObjectId,
    ref: "BookingDetail",
  }, 
  
},{
  timestamps: true,
});

const Redemption = mongoose.model("Redemption", redemptionSchema, "Redemptions");

exports.Redemption = Redemption;
