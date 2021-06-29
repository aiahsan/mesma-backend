"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  item: {
    type: String,
    required: true,
  },
  bookDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema["Types"].ObjectId,
    ref: "User",
  }, 
  quantity: {
    type: Number,
    required: true,
  }
  
},{
  timestamps: true,
});

const Booking = mongoose.model("Booking", bookingSchema, "Bookings");

exports.Booking = Booking;
