"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  _id: Schema["Types"].ObjectId,
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
 
  postCode: {
    type: String,
    required: true,
  },
 line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
    required: true,
  },
 
});

const Address = mongoose.model("Address", addressSchema, "Addresses");

exports.Address = Address;
