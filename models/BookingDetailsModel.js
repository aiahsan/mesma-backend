"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingDetailsSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  date: {
    type: Date,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
 
});

const BookingDetail = mongoose.model("BookingDetail", bookingDetailsSchema, "BookingDetails");

exports.BookingDetail = BookingDetail;
